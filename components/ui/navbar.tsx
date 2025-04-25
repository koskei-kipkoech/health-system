"use client";

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FaHospital } from 'react-icons/fa'
import { useAuth } from '@/lib/auth'

const publicNavItems = [
  { name: 'Home', href: '/' },
  { name: 'Login', href: '/login' },
  { name: 'Sign Up', href: '/signup' },
]

const privateNavItems = [
  { name: 'Home', href: '/' },
  { name: 'Programs', href: '/programs' },
  { name: 'Clients', href: '/clients' },
  { name: 'Dashboard', href: '/dashboard' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors">
              <motion.div className="text-purple-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaHospital className="h-8 w-8" />
              </motion.div>
              <span>HealthSystem</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {(isAuthenticated ? privateNavItems : publicNavItems).map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-neutral-900 dark:text-white
                             hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:hidden"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-900 dark:text-white
                       hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="absolute h-0.5 w-full bg-current transform transition-all duration-300"
                ></motion.span>
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute h-0.5 w-full bg-current top-2.5"
                ></motion.span>
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="absolute h-0.5 w-full bg-current top-5"
                ></motion.span>
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-neutral-950">
              {(isAuthenticated ? privateNavItems : publicNavItems).map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-neutral-900 dark:text-white
                             hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="px-3 py-2">
                    <span className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                      {user?.name}
                    </span>
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-neutral-900 dark:text-white
                               hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}