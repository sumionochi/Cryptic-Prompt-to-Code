"use client"

import { Link, Upload } from "lucide-react"
import { useState } from "react"
import { Navbar } from "@/components/Navbar"

export default function Page() {
  const [inputValue, setInputValue] = useState("")

  const suggestions = [
    "Create ToDo App in React",
    "Create Budget Track App",
    "Create Gym Management Portal Dashboard",
    "Create Quizz App On History",
    "Create Login Signup Screen",
  ]

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-0 pt-48 px-0">
        <h1 className="text-5xl font-bold text-center mb-4">What do you want to obfuscate?</h1>
        <p className="text-gray-400 text-center mb-12">Prompt, run, edit, and deploy full-stack web apps.</p>

        {/* Input Field */}
        <div className="relative max-w-3xl mx-auto mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What you want to build?"
            className="w-full p-6 bg-[#1C1C1C] border-2 border-white text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <Link className="absolute cursor-pointer right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Upload className="absolute cursor-pointer right-16 top-1/2 transform -translate-y-1/2 text-gray-400"/>
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
    </div>
  )
}

