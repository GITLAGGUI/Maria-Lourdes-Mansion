"use client";
import React from 'react';
import { motion } from 'framer-motion';
import RoomCard from './RoomCard';

const RoomListings: React.FC = () => {
  // Sample room data - in a real app, this would come from an API
  const rooms = [
    {
      id: '1',
      name: 'Presidential Suite',
      description: 'Our most luxurious accommodation featuring panoramic views, private terrace, and exclusive amenities for the ultimate luxury experience.',
      price: 850,
      currency: 'USD',
      images: [
        '/images/presidential-suite-1.jpg',
        '/images/presidential-suite-2.jpg',
        '/images/presidential-suite-3.jpg'
      ],
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Room Service', 'Private Terrace', 'Butler Service'],
      maxGuests: 4,
      size: '120 m²'
    },
    {
      id: '2',
      name: 'Executive Suite',
      description: 'Spacious suite with separate living area, premium furnishings, and stunning garden views perfect for business travelers.',
      price: 650,
      currency: 'USD',
      images: [
        '/images/executive-suite-1.jpg',
        '/images/executive-suite-2.jpg'
      ],
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Room Service', 'Work Desk', 'Garden View'],
      maxGuests: 3,
      size: '85 m²'
    },
    {
      id: '3',
      name: 'Deluxe Room',
      description: 'Elegantly appointed room with modern amenities and comfortable furnishings, ideal for couples seeking luxury and comfort.',
      price: 450,
      currency: 'USD',
      images: [
        '/images/deluxe-room-1.jpg',
        '/images/deluxe-room-2.jpg'
      ],
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Room Service'],
      maxGuests: 2,
      size: '45 m²'
    },
    {
      id: '4',
      name: 'Superior Room',
      description: 'Comfortable and stylish room with essential amenities and beautiful interior design for a memorable stay.',
      price: 320,
      currency: 'USD',
      images: [
        '/images/superior-room-1.jpg'
      ],
      amenities: ['Free WiFi', 'Smart TV', 'Room Service'],
      maxGuests: 2,
      size: '35 m²'
    },
    {
      id: '5',
      name: 'Garden Villa',
      description: 'Private villa surrounded by lush gardens with exclusive access to outdoor amenities and personalized service.',
      price: 1200,
      currency: 'USD',
      images: [
        '/images/garden-villa-1.jpg',
        '/images/garden-villa-2.jpg',
        '/images/garden-villa-3.jpg'
      ],
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Room Service', 'Private Garden', 'Pool Access', 'Concierge'],
      maxGuests: 6,
      size: '200 m²'
    },
    {
      id: '6',
      name: 'Classic Room',
      description: 'Thoughtfully designed room with classic elegance and modern comfort, perfect for solo travelers or couples.',
      price: 280,
      currency: 'USD',
      images: [
        '/images/classic-room-1.jpg'
      ],
      amenities: ['Free WiFi', 'Smart TV'],
      maxGuests: 2,
      size: '28 m²'
    }
  ];

  const handleBookNow = (roomId: string) => {
    console.log('Booking room:', roomId);
    // Handle booking logic here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="section-padding bg-neutral-50 dark:bg-neutral-900">
      <div className="container-modern">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 dark:text-white mb-6">
            Luxury <span className="gradient-text bg-gradient-to-r from-primary-500 to-accent-500">Accommodations</span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Discover our collection of meticulously designed rooms and suites, each offering 
            a unique blend of comfort, elegance, and personalized service.
          </p>
        </motion.div>

        {/* Filter/Sort Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button className="px-6 py-2 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors duration-300">
            All Rooms
          </button>
          <button className="px-6 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300">
            Suites
          </button>
          <button className="px-6 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300">
            Villas
          </button>
          <button className="px-6 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300">
            Sort by Price
          </button>
        </motion.div>

        {/* Room Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {rooms.map((room) => (
            <motion.div key={room.id} variants={itemVariants}>
              <RoomCard room={room} onBookNow={handleBookNow} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary px-8 py-3 text-lg"
          >
            Load More Rooms
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default RoomListings;