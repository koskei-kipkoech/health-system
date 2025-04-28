'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Client {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  enrolledPrograms?: string[];
}

interface ClientSearchProps {
  onClientSelect: (clientId: string) => void;
  clients?: Client[];
}

export const ClientSearch: React.FC<ClientSearchProps> = ({ onClientSelect, clients: initialClients }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<Client[]>(initialClients || []);
  const [filteredClients, setFilteredClients] = useState<Client[]>(initialClients || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialClients) {
      const fetchClients = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/clients');
          const data = await response.json();
          setClients(data);
          setFilteredClients(data);
        } catch (error) {
          console.error('Error fetching clients:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchClients();
    }
  }, [initialClients]);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = clients.filter(client =>
      client.name.toLowerCase().startsWith(lowerSearchTerm) ||
      client.email.toLowerCase().startsWith(lowerSearchTerm) ||
      client.phone.toLowerCase().startsWith(lowerSearchTerm)
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  return (
    <div className="w-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search clients..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="space-y-2">
          {filteredClients.map((client) => (
            <motion.div
              key={client._id || client.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onClientSelect(client._id || client.id || '')}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{client.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{client.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{client.phone}</p>
              <div className="mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Programs: {client.enrolledPrograms?.length || 0}
                </span>
              </div>
            </motion.div>
          ))}

          {filteredClients.length === 0 && (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              No clients found
            </div>
          )}
        </div>
      )}
    </div>
  );
};