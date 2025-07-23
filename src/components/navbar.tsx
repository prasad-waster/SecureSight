import Link from 'next/link'
import { Camera, Home, AlertTriangle, Users } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">SecureSight</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          <Link 
            href="/cameras" 
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <Camera className="h-4 w-4" />
            <span>Cameras</span>
          </Link>

          <Link 
            href="/incidents" 
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Incidents</span>
          </Link>

          <Link 
            href="/users" 
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <Users className="h-4 w-4" />
            <span>Users</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            15 Unresolved Incidents
          </div>
          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">M</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
