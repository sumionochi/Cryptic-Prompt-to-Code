"use client"

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function WorkspacePage() {
  const params = useParams()
  const workspaceId = params.id

  useEffect(() => {
    // Fetch workspace data using the ID
    const fetchWorkspace = async () => {
      try {
        const response = await fetch(`/api/workspace/${workspaceId}`)
        const data = await response.json()
        console.log('Workspace data:', data)
      } catch (error) {
        console.error('Error fetching workspace:', error)
      }
    }

    if (workspaceId) {
      fetchWorkspace()
    }
  }, [workspaceId])

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4">
      <h1 className="text-3xl font-bold mb-4">Workspace {workspaceId}</h1>
      {/* Workspace content will be added here */}
    </div>
  )
}