"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  WifiIcon, 
  TvIcon, 
  TruckIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  CakeIcon,
  PhoneIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const FacilitiesSection: React.FC = () => {
  const facilities = [
    {
      icon: WifiIcon,
      title: 'Complimentary WiFi',
      description: 'High-speed internet access throughout the property',
      image: '/images/wifi-facility.jpg'
    },
    {
      icon: TruckIcon,
      title: 'Valet Parking',
      description: 'Secure parking with professional valet service',
      image: '/images/parking-facility.jpg'
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Business Center',
      description: 'Fully equipped business facilities and meeting rooms',
      image: '/images/business-facility.jpg'
    },
    {
      icon: CakeIcon,
      title: 'Fine Dining',
      description: 'Award-winning restaurants and room service',
      image: '/images/dining-facility.jpg'
    },
    {
      icon: PhoneIcon,
      title: '24/7 Concierge',
      description: 'Personalized assistance around the clock',
      image: '/images/concierge-facility.jpg'
    },
    {
      icon: ClockIcon,
      title: 'Spa & Wellness',
      description: 'Rejuvenating treatments and wellness programs',
      image: '/images/spa-facility.jpg'
    }
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="amenities" className="section-padding bg-white dark:bg-neutral-950">
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
            World-Class <span className="gradient-text bg-gradient-to-r from-primary-500 to-accent-500">Facilities</span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Experience exceptional amenities and services designed to exceed your expectations 
            and create unforgettable memories during your stay.
          </p>
        </motion.div>

        {/* Facilities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="card-modern overflow-hidden h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="glass-card bg-white/10 backdrop-blur-md p-3 rounded-xl">
                      <facility.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-neutral-900 dark:text-white mb-3">
                    {facility.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="glass-card bg-gradient-to-r from-primary-500/10 to-accent-500/10 backdrop-blur-xl border border-primary-200/20 dark:border-primary-700/20 p-8 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-4">
              Ready to Experience Luxury?
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
              Discover all our amenities and book your perfect stay at Maria Lourdes Mansion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-3"
              >
                Book Your Stay
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary px-8 py-3"
              >
                Download Brochure
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FacilitiesSection;