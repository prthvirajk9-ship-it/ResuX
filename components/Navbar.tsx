'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              ResuX
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive('/')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              )}
            >
              Home
            </Link>
            <Link
              href="/templates"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive('/templates')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              )}
            >
              Templates
            </Link>
            <Link
              href="/builder"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive('/builder')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              )}
            >
              Create Resume
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}


