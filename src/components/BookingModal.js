'use client';
import { useState } from 'react';
import { X, Calendar, CreditCard, Wallet, Home, CheckCircle2 } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export default function BookingModal({ house, onClose, onSuccess }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [step, setStep] = useState(1); // 1: Select Dates, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const days = differenceInDays(new Date(endDate), new Date(startDate)) + 1;
    return Math.max(1, days) * house.pricePerDay;
  };

  const handleBooking = async () => {
    setLoading(true);
    setError('');
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
      // 1. Create Booking
      const bookRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          houseId: house._id,
          startDate,
          endDate,
        }),
      });

      const bookData = await bookRes.json();
      if (!bookData.success) {
        setError(bookData.error);
        setLoading(false);
        return;
      }

      // 2. Simulate Payment
      await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: bookData.data._id,
          amount: bookData.data.totalPrice,
          method: paymentMethod,
          status: 'success',
        }),
      });

      setStep(3); // Show success
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-6 h-6 text-slate-400" />
        </button>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-indigo-600 p-3 rounded-2xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">Select Dates</h2>
                  <p className="text-slate-500">When do you want to stay at {house.name}?</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Check-in</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Check-out</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {startDate && endDate && (
                <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
                  <div className="flex justify-between items-center mb-2 text-slate-600">
                    <span>Duration</span>
                    <span className="font-bold">{differenceInDays(new Date(endDate), new Date(startDate)) + 1} Nights</span>
                  </div>
                  <div className="flex justify-between items-center text-xl">
                    <span className="font-medium text-slate-900">Total Price</span>
                    <span className="font-black text-indigo-600">₹{calculateTotal()}</span>
                  </div>
                </div>
              )}

              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

              <button 
                disabled={!startDate || !endDate}
                onClick={() => setStep(2)}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-colors disabled:opacity-30"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-indigo-600 p-3 rounded-2xl">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">Secure Payment</h2>
                  <p className="text-slate-500">Select your preferred payment method</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['UPI', 'Credit Card', 'Debit Card', 'Cash'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all text-slate-700 ${
                      paymentMethod === m 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <span className="font-bold block">{m}</span>
                  </button>
                ))}
              </div>

              <div className="bg-indigo-600 p-6 rounded-3xl text-white">
                <div className="flex justify-between items-center opacity-80 mb-1">
                  <span className="text-sm">Payable Amount</span>
                </div>
                <div className="text-3xl font-black">₹{calculateTotal()}</div>
              </div>

              <button 
                disabled={loading}
                onClick={handleBooking}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? 'Processing Payment...' : `Pay ₹${calculateTotal()} & Book Now`}
              </button>
              
              <button 
                onClick={() => setStep(1)}
                className="w-full text-slate-500 font-bold py-2 hover:text-slate-900 transition-colors"
              >
                Back to date selection
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8 space-y-6">
              <div className="flex justify-center">
                <div className="bg-emerald-100 p-6 rounded-full animate-bounce">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Booking Confirmed!</h2>
                <p className="text-slate-500 leading-relaxed px-8">
                  Your stay is confirmed. You can find all the details in the "My Bookings" section.
                </p>
              </div>
              <button 
                onClick={onSuccess}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-colors"
              >
                Go to My Bookings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
