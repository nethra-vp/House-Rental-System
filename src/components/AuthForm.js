'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthForm({ role }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role }),
      });

      const result = await res.json();
      if (result.success) {
        // Simple session simulation using localStorage
        localStorage.setItem('user', JSON.stringify(result.data));
        router.push(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-slate-900">
        {role === 'admin' ? 'Admin Access' : 'User Login'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-900"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-900"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Enter Portal'}
        </button>
      </form>
      <p className="mt-6 text-center text-slate-500 text-sm">
        No password required for this demo.
      </p>
    </div>
  );
}
