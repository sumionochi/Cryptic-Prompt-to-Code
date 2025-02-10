"use client"

import { Check, Link, Rocket, TicketIcon, Upload } from "lucide-react"
import { useContext, useState } from "react"
import { Navbar } from "@/components/Navbar"
import { MessageContext } from "@/lib/MessageContext"
import { UserInfoContext } from "@/lib/UserInfoContext"
import { SignInDialog } from "@/components/SignInDialog"
import { useRouter } from "next/navigation"

export default function Page() {
  const [inputValue, setInputValue] = useState("")
  const [openDialog, setOpenDialog] = useState(false)

  const {messages, setMessages} = useContext(MessageContext);
  const {userDetail, setUserDetail} = useContext(UserInfoContext);
  const router = useRouter();

  const onGenerate = async (input: string) => {
    if(!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    try {
      const input_message = {
        role: 'user',
        content: input
      }
      setMessages(input_message);

      console.log(input_message, userDetail.id);
      
      const response = await fetch('/api/workspace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input:input_message,
          userId: userDetail.id
        }),
      });
      const data = await response.json();
      router.push(`/workspace/${data.id}`);
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  }

  const suggestions = [
    "Create ToDo App in React",
    "Create Budget Track App",
    "Create Gym Management Portal Dashboard",
    "Create Quizz App On History",
    "Create Login Signup Screen",
  ]

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4">

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-0 pt-48 px-0">
        <h1 className="text-5xl font-bold text-center mb-4">What do you want to obfuscate?</h1>
        <p className="text-gray-400 text-center mb-12">Prompt, run, edit, and deploy full-stack web apps.</p>

        {/* Input Field */}
        <div className="relative max-w-3xl mx-auto mb-8 flex-col">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What you want to build?"
            className="w-full p-6 bg-[#1C1C1C] border-2 border-white text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex flex-row gap-4 pt-4 ">
            <button
              onClick={() => onGenerate(inputValue)}
              className=" text-gray-400 hover:text-white transition-colors"
            >
              <Check className=" bg-white" />
            </button>
            <button
              className=" text-gray-400 hover:text-white transition-colors"
            >
              <Upload />
            </button>
          </div>
        </div>

        {/* Suggestion Buttons */}
        <div className="flex max-w-3xl mx-auto flex-wrap gap-3 justify-center">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputValue(suggestion)}
              className="px-4 py-2 bg-[#1C1C1C] border-2 border-gray-800 hover:border-white transition-colors text-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Warning Note */}
        <div className="mt-16 max-w-3xl mx-auto p-4 border-2 border-yellow-500 bg-[#1C1C1C] flex gap-3">
          <div className="flex items-center gap-2">
            <div className="text-yellow-500 font-bold">Note!</div>
            <div className="text-gray-400">
              Due to high traffic, the app might not work properly. We appreciate your patience.
            </div>
          </div>
        </div>
      </main>

      <SignInDialog 
        openDialog={openDialog} 
        closeDialog={(value: boolean) => setOpenDialog(value)} 
      />
    </div>
  )
}

