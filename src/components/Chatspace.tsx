import { MessageContext } from '@/lib/MessageContext'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

type Props = {}

const Chatspace = (props: Props) => {
  const params = useParams()
  const workspaceId = params.id
  const {messages, setMessages} = useContext(MessageContext);

  useEffect(() => {
    // Fetch workspace data using the ID
    const fetchWorkspace = async () => {
      try {
        const response = await fetch(`/api/workspace/${workspaceId}`)
        const data = await response.json()
        setMessages(data?.messages);
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
    <div>
      
    </div>
  )
}

export default Chatspace