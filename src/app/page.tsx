"use client"

import { Check, Upload } from "lucide-react"
import { useContext, useState } from "react"
import { MessageContext } from "@/lib/MessageContext"
import { UserInfoContext } from "@/lib/UserInfoContext"
import { SignInDialog } from "@/components/SignInDialog"
import { useRouter } from 'next/navigation';
import { useTheme } from "next-themes"

export default function Page() {
  const [inputValue, setInputValue] = useState("")
  const [openDialog, setOpenDialog] = useState(false)

  const { messages, setMessages } = useContext(MessageContext)
  const { userDetail, setUserDetail } = useContext(UserInfoContext)
  const router = useRouter();
  const { theme, setTheme } = useTheme()

  const onGenerate = async (input: string) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    try {
      const input_message = {
        role: "user",
        content: input,
      };
  
      console.log(input_message, userDetail.id);
  
      const response = await fetch("/api/workspace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: [input_message],
          userId: userDetail.id,
        }),
      });
      const data = await response.json();
      console.log("received data now moving to workplace", data);
      router.push(`/workspace/${data.id}`);
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  const suggestions = [
    "Create ToDo App in React",
    "Create Budget Track App",
    "Create Gym Management Portal Dashboard",
    "Create Quizz App On History",
    "Create Login Signup Screen",
  ]

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary text-foreground font-sans p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]" />

      <main className="max-w-4xl mx-auto mt-0 pt-48 px-0 relative z-10">
        <h1 className="text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          What do you want to obfuscate?
        </h1>
        <p className="text-muted-foreground text-center mb-12 text-lg">
          Prompt, run, edit, and deploy full-stack web apps.
        </p>

        <div className="relative max-w-3xl mx-auto mb-8 flex-col">
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

        <div className="flex max-w-3xl mx-auto flex-wrap gap-3 justify-center">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputValue(suggestion)}
              className="px-4 py-2 glassmorphism hover:bg-accent/50 transition-colors text-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto p-4 glassmorphism rounded-lg flex gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="text-yellow-500 font-bold">Note!</div>
            <div className="text-muted-foreground">
              Work in Progress. Still in Beta.
            </div>
          </div>
        </div>
      </main>

      <SignInDialog openDialog={openDialog} closeDialog={(value: boolean) => setOpenDialog(value)} />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-3xl opacity-50 pointer-events-none float" />
      <div
        className="fixed bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl opacity-50 pointer-events-none float"
        style={{ animationDelay: "-3s" }}
      />
    </div>
    </>
  )
}

