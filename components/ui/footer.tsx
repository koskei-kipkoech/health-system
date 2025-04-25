'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/about#services' },
    { name: 'Login', href: '/login' },
    { name: 'Sign Up', href: '/signup' },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Health System
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Providing exceptional healthcare services with cutting-edge technology and
              compassionate care for our community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>123 Healthcare Ave</p>
              <p>Medical City, MC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@healthsystem.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} Health System. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  aria-label={item.label}
                >
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;