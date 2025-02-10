"use client"

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Chatspace from '@/components/Chatspace'
import Codespace from '@/components/Codespace'

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
    <div className="min-h-screen mt-16 bg-black text-white font-mono p-4">
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <Chatspace/>
        <div>
          <Codespace/>
        </div>
      </div>
    </div>
  )
}