'use client';
import { Home, Users, Bed, MapPin } from 'lucide-react';

export default function HouseCard({ house, onBook }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden group hover:shadow-2xl transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={house.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop'} 
          alt={house.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 border border-white/20">
          {house.type}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{house.name}</h3>
            <div className="flex items-center text-slate-500 text-sm mt-1">
              <MapPin className="w-3.5 h-3.5 mr-1 text-indigo-500" />
              {house.location}
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-indigo-600">₹{house.pricePerDay}</span>
            <span className="text-slate-400 text-xs block">/ day</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-slate-600 bg-slate-50 p-2 rounded-xl">
            <Bed className="w-4 h-4 mr-2 text-slate-400" />
            <span className="text-sm font-medium">{house.rooms} Rooms</span>
          </div>
          <div className="flex items-center text-slate-600 bg-slate-50 p-2 rounded-xl">
            <Users className="w-4 h-4 mr-2 text-slate-400" />
            <span className="text-sm font-medium">{house.accommodation} Guests</span>
          </div>
        </div>

        <button 
          onClick={() => onBook(house)}
          className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-2xl hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}