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
  Upload,
  RollerCoaster,
  Loader
} from 'lucide-react';
import Image from "next/image";
import { UserInfoContext } from '@/lib/UserInfoContext'
import Prompt from '@/data/Prompt'

interface Message {
  role: 'user' | 'ai'; 
  content: string;
}

type Props = {}

const Chatspace = (props: Props) => {
  const params = useParams()
  const workspaceId = params.id
  const {messages, setMessages} = useContext(MessageContext) as {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  };
  const { userDetail, setUserDetail } = useContext(UserInfoContext)
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false);

  const onGenerate = async (input: string) => {
    console.log("reached user submission in workspace")
    setMessages((prev:Message[])=>[...prev, {
      role: 'user',
      content: input,
    }])
    setInputValue(' ')
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

  const GetAiResponse = async () => {
    try {
      setLoading(true);
      const prompt_string = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
      const response = await fetch(`/api/ai_chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt_string,
        }),
      });
      const data = await response.json();
      console.log("Here is the ai response",data.result);
      setMessages((prev : Message[]) => [...prev, {
        role: 'ai',
        content: data.result,
      }]);
      
      // Update workspace messages
      await fetch('/api/workspace/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workspaceId,
          messages: [...messages, { role: 'ai', content: data.result }],
        }),
      });
      //POST api for update of messages
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workspace:', error);
      setMessages([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages?.length - 1].role;
      if (lastMessage === 'user') {
        GetAiResponse();
      }
    }
  }, [messages]);

  return (
    <div className="flex scrollbar-hide relative h-[100%] border mt-1 flex-col overflow-hidden bg-background">
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
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
        {messages?.map((message, index: number) => (
          <div
            key={index}
            className={`flex items-start gap-2 leading-7 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
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
            <div className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none border' : 'bg-muted rounded-tl-none border'}`}>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className='flex p-2 flex-row gap-2 items-center'>
          <Loader className='animate-spin w-5 h-5'/>
          <h2>Generating Response...</h2>
        </div>
        )}
      </div>
      <div className="bottom-0 w-[100%] mx-auto flex-col">
          <div className="glassmorphism p-2 rounded-lg">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What do you want to build?"
              className="w-full p-4 bg-transparent text-foreground text-lg focus:outline-none"
            />
            <div className="flex flex-row gap-4 pt-4 justify-end">
              <button
                onClick={() => onGenerate(inputValue)}
                className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                <Check className="w-6 h-6" />
              </button>
              <button className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                <Upload className="w-6 h-6" />
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Chatspace