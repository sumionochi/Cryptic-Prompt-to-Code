import { Leaf, Zap } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black z-50 border-b-2 border-white">
      <div className="mx-auto flex justify-between items-center p-4">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Leaf className="w-8 h-8" />
        </Link>
        <div className="flex gap-4">
          <button className="px-4 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors font-mono">
            Sign In
          </button>
          <button className="px-4 py-2 bg-teal-500 border-2 border-teal-500 hover:bg-teal-600 text-white transition-colors font-mono">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}
