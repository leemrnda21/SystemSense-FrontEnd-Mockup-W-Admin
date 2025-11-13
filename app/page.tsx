"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Coffee, LogIn, ShoppingCart } from "lucide-react"
import MenuDisplay from "@/components/menu-display"
import { LanguageProvider } from "@/context/language-context"

const AdminPanel = dynamic(() => import("@/components/admin-panel"), {
  ssr: false,
})

export default function Home() {
  const [showMenu, setShowMenu] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [adminAuthenticated, setAdminAuthenticated] = useState(false)

  const handleAdminLogin = (password: string) => {
    if (password === "admin123") {
      setAdminAuthenticated(true)
      setShowAdmin(true)
    } else {
      alert("Invalid password")
    }
  }

  if (adminAuthenticated && showAdmin) {
    return <AdminPanel onLogout={() => setAdminAuthenticated(false)} />
  }

  if (showMenu) {
    return (
      <LanguageProvider>
        <MenuDisplay onBack={() => setShowMenu(false)} restaurantId="demo" />
      </LanguageProvider>
    )
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        {/* Admin Access Button */}
        <div className="fixed top-6 right-6 z-50">
          <button 
            onClick={() => setShowAdmin(!showAdmin)} 
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <LogIn className="w-4 h-4" />
            Admin
          </button>
        </div>

        {/* Admin Modal */}
        {showAdmin && !adminAuthenticated && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 w-96 max-w-full mx-4 border border-purple-500/20">
              <h3 className="font-bold text-2xl mb-2 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">Admin Access</h3>
              <p className="text-gray-400 text-sm mb-6">Enter your credentials to continue</p>
              <input
                type="password"
                placeholder="Enter admin password"
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdminLogin(adminPassword)
                }}
              />
              <div className="flex gap-3 justify-end">
                <button 
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors text-white"
                  onClick={() => setShowAdmin(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                  onClick={() => handleAdminLogin(adminPassword)}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
          {/* Logo and Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Coffee className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                MenuScan
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-2">Smart Restaurant Menu System</p>
            <p className="text-gray-400">Experience dining redefined with QR code simplicity</p>
          </div>

          {/* Main Card */}
          <div className="w-full max-w-2xl">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden hover:border-purple-500/40 transition-colors">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl text-center font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
                  Welcome!
                </h2>
                <p className="text-gray-300 text-center mb-8 text-lg">
                  Scan the QR code on your table to view our exclusive menu
                </p>

                <div className="space-y-6">
                  {/* Instructions */}
                  <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-2 border-purple-500/30 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-purple-300 mb-4 flex items-center gap-2">
                      <span className="text-2xl">📋</span> How it works:
                    </h3>
                    <ol className="text-gray-300 space-y-3 ml-4">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
                        <span>Open your phone camera</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
                        <span>Point at the QR code on your table</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
                        <span>Tap the notification to open the menu</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</span>
                        <span>Browse items and place your order</span>
                      </li>
                    </ol>
                  </div>

                  {/* Demo Button */}
                  <button
                    onClick={() => setShowMenu(true)}
                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    View Sample Menu
                  </button>

                  {/* Features Grid */}
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    <div className="bg-slate-700/50 rounded-xl p-4 text-center hover:bg-slate-700/80 transition-colors">
                      <div className="text-4xl mb-2">🍽️</div>
                      <span className="text-gray-300 text-sm font-semibold">Full Menu</span>
                    </div>
                    <div className="bg-slate-700/50 rounded-xl p-4 text-center hover:bg-slate-700/80 transition-colors">
                      <div className="text-4xl mb-2">📱</div>
                      <span className="text-gray-300 text-sm font-semibold">Mobile First</span>
                    </div>
                    <div className="bg-slate-700/50 rounded-xl p-4 text-center hover:bg-slate-700/80 transition-colors">
                      <div className="text-4xl mb-2">🌐</div>
                      <span className="text-gray-300 text-sm font-semibold">Multi-language</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-gray-500 text-sm mt-12 text-center">Made with ❤️ for restaurants that care about quality</p>
        </div>
      </div>
    </LanguageProvider>
  )
}
