"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  WifiIcon, 
  TvIcon, 
  HomeIcon, 
  UserGroupIcon,
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

interface RoomCardProps {
  room: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    amenities: string[];
    maxGuests: number;
    size: string;
  };
  onBookNow: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onBookNow }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const amenityIcons = {
    'Free WiFi': WifiIcon,
    'Smart TV': TvIcon,
    'Mini Bar': HomeIcon,
    'Room Service': UserGroupIcon,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="card-modern overflow-hidden group"
    >
      {/* Image Gallery */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={room.images[currentImageIndex] || '/images/room-placeholder.jpg'}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Image Navigation */}
        {room.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {room.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="glass-card bg-black/20 backdrop-blur-md px-3 py-1">
            <div className="flex items-center gap-1 text-white">
              <CurrencyDollarIcon className="w-4 h-4" />
              <span className="font-bold text-lg">{room.price}</span>
              <span className="text-sm opacity-75">/{room.currency} night</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Room Info */}
        <div className="mb-4">
          <h3 className="text-xl font-serif font-bold text-neutral-900 dark:text-white mb-2">
            {room.name}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Room Details */}
        <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          <div className="flex items-center gap-1">
            <UserGroupIcon className="w-4 h-4" />
            <span>{room.maxGuests} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <HomeIcon className="w-4 h-4" />
            <span>{room.size}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
            Amenities
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {room.amenities.slice(0, 4).map((amenity) => {
              const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || HomeIcon;
              return (
                <div key={amenity} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <IconComponent className="w-4 h-4" />
                  <span>{amenity}</span>
                </div>
              );
            })}
          </div>
          {room.amenities.length > 4 && (
            <p className="text-xs text-neutral-500 mt-2">
              +{room.amenities.length - 4} more amenities
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-300"
          >
            View Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onBookNow(room.id)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;