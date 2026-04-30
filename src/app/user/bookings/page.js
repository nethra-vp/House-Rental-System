'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { format } from 'date-fns';
import { Calendar, Tag, MapPin, AlertCircle, CheckCircle2, XCircle, Home, Bed, Users } from 'lucide-react';

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    
    try {
      const res = await fetch(`/api/bookings?userId=${user._id}`);
      const data = await res.json();
      if (data.success) setBookings(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      });
      const data = await res.json();
      if (data.success) fetchBookings();
    } catch (err) {
      alert('Failed to cancel booking');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed': return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Confirmed</span>;
      case 'cancelled': return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" /> Cancelled</span>;
      case 'completed': return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Completed</span>;
      default: return null;
    }
  };

  return (
    <>
      <Navbar role="user" />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-2">My <span className="text-indigo-600">Bookings</span></h1>
          <p className="text-slate-500">Track and manage your upcoming and past stays.</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => <div key={i} className="h-40 bg-slate-100 rounded-3xl animate-pulse" />)}
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row">
                <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={booking.houseId?.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop'} 
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{booking.houseId?.name}</h3>
                        <p className="text-slate-500 font-medium">{booking.houseId?.type}</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-slate-600">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                        <span className="font-semibold">{format(new Date(booking.startDate), 'MMM dd, yyyy')}</span>
                        <span className="mx-2 text-slate-300">→</span>
                        <span className="font-semibold">{format(new Date(booking.endDate), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                        <span>Location: {booking.houseId?.location}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Bed className="w-4 h-4 mr-2 text-indigo-500" />
                        <span>{booking.houseId?.rooms} Rooms</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Users className="w-4 h-4 mr-2 text-indigo-500" />
                        <span>Up to {booking.houseId?.accommodation} Guests</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                    <div>
                      <span className="text-slate-400 text-sm block">Paid Total</span>
                      <span className="text-2xl font-black text-slate-900">₹{booking.totalPrice}</span>
                    </div>
                    {booking.status === 'confirmed' && (
                      <button 
                        onClick={() => cancelBooking(booking._id)}
                        className="bg-red-50 text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-red-100 transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[3rem] py-20 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">No bookings yet</h3>
            <p className="text-slate-500 mb-8">Ready to find your perfect stay? Your next adventure is just a click away.</p>
            <button 
              onClick={() => router.push('/user/dashboard')}
              className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
            >
              Browse Properties
            </button>
          </div>
        )}
      </div>
    </>
  );
}
