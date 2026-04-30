import Link from 'next/link';
import { User, ShieldCheck, Home } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
          Stay<span className="text-indigo-600">Haven</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-md mx-auto">
          The ultimate platform for seamless house rentals and property management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* User Portal Option */}
        <Link 
          href="/user/login"
          className="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
          <div className="relative z-10">
            <div className="bg-indigo-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
              <User className="w-7 h-7 text-indigo-600 group-hover:text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">User Portal</h2>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Browse our premium properties, book your perfect stay, and manage your reservations effortlessly.
            </p>
            <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
              Get Started 
              <span className="ml-2">→</span>
            </div>
          </div>
        </Link>

        {/* Admin Portal Option */}
        <Link 
          href="/admin/login"
          className="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
          <div className="relative z-10">
            <div className="bg-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 transition-colors">
              <ShieldCheck className="w-7 h-7 text-slate-900 group-hover:text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin Portal</h2>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Manage property inventory, track all bookings, and monitor payments in real-time.
            </p>
            <div className="flex items-center text-slate-900 font-semibold group-hover:translate-x-2 transition-transform">
              Access Dashboard 
              <span className="ml-2">→</span>
            </div>
          </div>
        </Link>
      </div>
      
      <div className="mt-16 flex gap-8 items-center text-slate-400 font-medium">
        <span>Premium Properties</span>
        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
        <span>Instant Booking</span>
        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
        <span>Secure Payments</span>
      </div>
    </div>
  );
}
