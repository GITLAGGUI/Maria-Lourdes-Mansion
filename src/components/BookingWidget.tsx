"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface BookingWidgetProps {
  className?: string;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ className = '' }) => {
  const [checkIn, setCheckIn] = React.useState('');
  const [checkOut, setCheckOut] = React.useState('');
  const [rooms, setRooms] = React.useState(1);
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);

  const handleSearch = () => {
    // Handle booking search logic
    console.log('Search booking:', { checkIn, checkOut, rooms, adults, children });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`glass-card bg-white/10 backdrop-blur-xl border border-white/20 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6">
        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Check-in
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Check-out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Rooms */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90 flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            Rooms
          </label>
          <select
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num} className="bg-neutral-800">
                {num} Room{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/90 flex items-center gap-2">
            <UserGroupIcon className="w-4 h-4" />
            Guests
          </label>
          <div className="flex gap-2">
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="flex-1 px-2 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num} className="bg-neutral-800">
                  {num} Adult{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="flex-1 px-2 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {[0, 1, 2, 3, 4].map(num => (
                <option key={num} value={num} className="bg-neutral-800">
                  {num} Child{num > 1 ? 'ren' : num === 1 ? '' : 'ren'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="w-full px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Search
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingWidget;