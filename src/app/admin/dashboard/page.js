'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { IndianRupee, Home, CalendarCheck, Users, TrendingUp, ArrowRight, History } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalHouses: 0,
    totalBookings: 0,
    activeBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [hRes, bRes, pRes] = await Promise.all([
        fetch('/api/houses'),
        fetch('/api/bookings'),
        fetch('/api/payments')
      ]);

      const hData = await hRes.json();
      const bData = await bRes.json();
      const pData = await pRes.json();

      if (hData.success && bData.success && pData.success) {
        setStats({
          totalRevenue: pData.data.reduce((acc, p) => 
            p.bookingId?.status !== 'cancelled' ? acc + p.amount : acc, 0
          ),
          totalHouses: hData.data.length,
          totalBookings: bData.data.length,
          activeBookings: bData.data.filter(b => b.status === 'confirmed').length
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: IndianRupee, color: 'bg-emerald-500', trend: '+12.5%' },
    { label: 'Total Properties', value: stats.totalHouses, icon: Home, color: 'bg-indigo-500', trend: 'Inventory' },
    { label: 'Total Bookings', value: stats.totalBookings, icon: CalendarCheck, color: 'bg-amber-500', trend: 'Lifetime' },
    { label: 'Active Stays', value: stats.activeBookings, icon: Users, color: 'bg-blue-500', trend: 'In progress' },
  ];

  return (
    <>
      <Navbar role="admin" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Admin <span className="text-indigo-600">Overview</span></h1>
            <p className="text-slate-500">Real-time performance monitoring and property health.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link 
              href="/admin/vehicles"
              className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all"
            >
              Manage Properties
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-5 rounded-bl-full -mr-4 -mt-4 group-hover:scale-110 transition-transform`} />
              <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{loading ? '...' : stat.value}</h3>
              <div className="mt-4 flex items-center text-xs font-bold text-slate-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-indigo-600 rounded-[3rem] p-10 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4">Add New Properties</h3>
              <p className="text-indigo-100 mb-8 max-w-sm leading-relaxed">
                Expand your rental business by adding more villas, apartments, penthouses, or duplexes to your inventory.
              </p>
              <Link 
                href="/admin/vehicles"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all"
              >
                Add Property <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <Home className="absolute bottom-[-20%] right-[-10%] w-80 h-80 text-white/10 rotate-12" />
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-black mb-4">System Reports</h3>
              <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
                Review all transactions and booking histories to optimize your revenue streams.
              </p>
            </div>
            <Link 
              href="/admin/bookings"
              className="inline-flex items-center gap-2 bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all"
            >
              View All Bookings <History className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
