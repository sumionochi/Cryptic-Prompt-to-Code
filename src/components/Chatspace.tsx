import { MessageContext } from '@/lib/MessageContext'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Send, Hash, UserPlus, History, X, Bot, 
  Sparkles, Command, MessageSquare, 
  MessageCircle,
  MessageCirclePlus,
  HistoryIcon,
  Cross,
  CircleUserRound,
  Check,
  Upload
} from 'lucide-react';
import Image from "next/image";
import { UserInfoContext } from '@/lib/UserInfoContext'


type Props = {}

const Chatspace = (props: Props) => {
  const params = useParams()
  const workspaceId = params.id
  const {messages, setMessages} = useContext(MessageContext);
  const { userDetail, setUserDetail } = useContext(UserInfoContext)
  const [inputValue, setInputValue] = useState("")

  const onGenerate = async (input: string) => {
    console.log("reached user submission in workspace")
  };

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const response = await fetch(`/api/workspace/${workspaceId}`);
        const data = await response.json();
        setMessages(data?.message || []); 
      } catch (error) {
        console.error('Error fetching workspace:', error);
        setMessages([]); 
      }
    };

    if (workspaceId) {
      fetchWorkspace();
    }
  }, [workspaceId]);

  return (
    <div className="flex relative h-full border mt-1 flex-col overflow-hidden bg-background">
      <div className="flex justify-between items-center p-4">
        <div className='flex flex-row gap-2'>
          <Button variant="ghost" className='glassmorphism'>
            Chat
          </Button>
          <Button variant="ghost" className='glassmorphism'>
            Builder <span className="ml-1 text-transparent text-xs bg-gradient-to-br from-teal-500 to-cyan-500 bg-clip-text font-bold">Beta</span>
          </Button>
        </div>
        <div className='flex flex-row gap-2'>
          <MessageCirclePlus className='w-5 h-5'/>
          <HistoryIcon className='w-5 h-5'/>
          <Cross className='w-5 h-5'/>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message, index: number) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className="flex-shrink-0">
              {message.role === 'user' ? (
                <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-primary text-primary-foreground">
                  {userDetail?.picture ? (
                    <Image
                      src={userDetail.picture}
                      alt={userDetail.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold">
                      {userDetail?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                  <Bot className="w-5 h-5" />
                </div>
              )}
            </div>
            <div className={`max-w-[80%] rounded-lg rounded-tr-none  p-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-0 w-[100%] mx-auto flex-col">
          <div className="glassmorphism p-2 rounded-lg">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What do you want to build?"
              className="w-full p-4 bg-transparent text-foreground placeholder-muted-foreground text-lg focus:outline-none"
            />
            <div className="flex flex-row gap-4 pt-4 justify-end">
              <button
                onClick={() => onGenerate(inputValue)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Check className="w-6 h-6" />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Upload className="w-6 h-6" />
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Chatspace