"use client"

import { ClientCard } from '@/components/ui/client-card'
import { IClient } from '@/types'
import { useEffect, useState } from 'react'

export default function InfoPage() {
  const [clients, setClients] = useState<IClient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients')
        if (!response.ok) throw new Error('Failed to fetch clients')
        const data = await response.json()
        setClients(data.data || [])
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load clients')
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="container mt-10 mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Client Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.length > 0 ? (
          clients.map((client) => (
            <ClientCard key={client._id} client={client} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
            No clients found
          </div>
        )}
      </div>
    </div>
  )
}
