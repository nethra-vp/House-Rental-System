'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { format } from 'date-fns';
import { CheckCircle2, XCircle, Clock, Search, Filter, ArrowUpRight, Home, Bed, Users } from 'lucide-react';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success) setBookings(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) fetchBookings();
    } catch (err) {
      alert('Update failed');
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  return (
    <>
      <Navbar role="admin" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Booking <span className="text-indigo-600">Records</span></h1>
            <p className="text-slate-500">Monitor and manage all customer reservations.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
            {['all', 'confirmed', 'completed', 'cancelled'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
                  filter === f ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-slate-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-6 text-sm font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                    <th className="px-8 py-6 text-sm font-bold text-slate-400 uppercase tracking-widest">Property</th>
                    <th className="px-8 py-6 text-sm font-bold text-slate-400 uppercase tracking-widest">Duration</th>
                    <th className="px-8 py-6 text-sm font-bold text-slate-400 uppercase tracking-widest">Revenue</th>
                    <th className="px-8 py-6 text-sm font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-sm font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-900">{booking.userId?.name}</div>
                        <div className="text-xs text-slate-400">{booking.userId?.email}</div>
                      </td>
                      <td className="px-8 py-6 font-semibold text-slate-700">
                        <div>{booking.houseId?.name}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1"><Bed className="w-3 h-3" /> {booking.houseId?.rooms} Rooms</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {booking.houseId?.accommodation} Guests</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-medium text-slate-600">
                          {format(new Date(booking.startDate), 'MMM dd')} - {format(new Date(booking.endDate), 'MMM dd')}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-lg font-black text-slate-900">₹{booking.totalPrice}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
                          {booking.status === 'confirmed' && (
                            <>
                              <button 
                                onClick={() => updateStatus(booking._id, 'completed')}
                                className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors"
                                title="Mark as Completed"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => updateStatus(booking._id, 'cancelled')}
                                className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                                title="Cancel Booking"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {booking.status === 'completed' && <Clock className="w-5 h-5 text-slate-300 ml-2" />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
