'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaHospital, FaUserMd, FaAmbulance, FaHeartbeat } from 'react-icons/fa';

const AboutPage = () => {
  const services = [
    {
      icon: <FaHospital className="text-4xl text-primary" />,
      title: 'Modern Facilities',
      description: 'State-of-the-art medical facilities equipped with the latest technology'
    },
    {
      icon: <FaUserMd className="text-4xl text-primary" />,
      title: 'Expert Doctors',
      description: 'Highly qualified and experienced medical professionals'
    },
    {
      icon: <FaAmbulance className="text-4xl text-primary" />,
      title: '24/7 Emergency',
      description: 'Round-the-clock emergency medical services'
    },
    {
      icon: <FaHeartbeat className="text-4xl text-primary" />,
      title: 'Specialized Care',
      description: 'Comprehensive specialized medical treatments and procedures'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white  dark:from-black/20 dark:to-black">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Our Health System
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dedicated to providing exceptional healthcare services with cutting-edge technology
            and compassionate care for our community.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
            To enhance the health and well-being of our community by delivering innovative,
            high-quality healthcare services with compassion and excellence.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;