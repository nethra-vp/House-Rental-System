'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, User, LogOut, LayoutDashboard, History, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar({ role }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const navItems = role === 'admin' 
    ? [
        { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Properties', href: '/admin/vehicles', icon: Home },
        { label: 'Bookings', href: '/admin/bookings', icon: History },
      ]
    : [
        { label: 'Browse', href: '/user/dashboard', icon: Home },
        { label: 'My Bookings', href: '/user/bookings', icon: History },
      ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Stay<span className="text-indigo-600">Haven</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
                pathname === item.href 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold text-slate-900">{user?.name || 'Guest'}</span>
            <span className="text-xs text-slate-500 capitalize">{role} Portal</span>
          </div>
          <button 
            onClick={handleLogout}
            className="hidden sm:block p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-2 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl mb-4 sm:hidden">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{user?.name || 'Guest'}</p>
              <p className="text-xs text-slate-500 capitalize">{role} Portal</p>
            </div>
          </div>
          
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
                pathname === item.href 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-red-600 hover:bg-red-50 transition-all mt-4"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
