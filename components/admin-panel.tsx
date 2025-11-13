"use client"

import { useState, useEffect } from "react"
import { LogOut, Plus, Trash2, Edit2 } from "lucide-react"

interface AdminPanelProps {
  onLogout: () => void
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
}

const INITIAL_MENU: MenuItem[] = [
  { id: "1", name: "Espresso", description: "Rich and bold", price: 2.5, category: "coffee" },
  { id: "2", name: "Cappuccino", description: "With foam", price: 4.0, category: "coffee" },
  { id: "3", name: "Croissant", description: "Buttery pastry", price: 3.5, category: "pastry" },
]

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<MenuItem>({
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "coffee",
  })

  // Load menu from localStorage on mount
  useEffect(() => {
    const savedMenu = localStorage.getItem("restaurantMenu")
    if (savedMenu) {
      try {
        setMenu(JSON.parse(savedMenu))
      } catch (e) {
        console.error("Failed to load menu:", e)
      }
    }
  }, [])

  // Save menu to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("restaurantMenu", JSON.stringify(menu))
  }, [menu])

  const handleAdd = () => {
    if (formData.name && formData.description) {
      if (editingId) {
        setMenu(menu.map((item) => (item.id === editingId ? { ...formData, id: editingId } : item)))
        setEditingId(null)
      } else {
        setMenu([...menu, { ...formData, id: Date.now().toString() }])
      }
      setFormData({ id: "", name: "", description: "", price: 0, category: "coffee" })
    }
  }

  const handleEdit = (item: MenuItem) => {
    setFormData(item)
    setEditingId(item.id)
  }

  const handleDelete = (id: string) => {
    setMenu(menu.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your restaurant menu</p>
          </div>
          <button 
            onClick={onLogout} 
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg font-semibold flex items-center gap-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="relative z-10 px-6 py-8 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-colors">
            <p className="text-gray-400 text-sm mb-2">Total Items</p>
            <p className="text-4xl font-bold text-purple-400">{menu.length}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-colors">
            <p className="text-gray-400 text-sm mb-2">Categories</p>
            <p className="text-4xl font-bold text-blue-400">{new Set(menu.map(m => m.category)).size}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-pink-500/20 rounded-xl p-6 hover:border-pink-500/40 transition-colors">
            <p className="text-gray-400 text-sm mb-2">Average Price</p>
            <p className="text-4xl font-bold text-pink-400">${(menu.reduce((sum, item) => sum + item.price, 0) / menu.length || 0).toFixed(2)}</p>
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 rounded-2xl p-8 mb-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text mb-6">
            {editingId ? "✏️ Edit Menu Item" : "➕ Add New Item"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Item Name *</label>
              <input
                type="text"
                placeholder="e.g., Cappuccino"
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Price *</label>
              <input
                type="number"
                placeholder="5.99"
                step="0.01"
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number.parseFloat(e.target.value) : 0 })}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Category *</label>
              <select
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="coffee">☕ Coffee</option>
                <option value="food">🍽️ Food</option>
                <option value="pastry">🥐 Pastry</option>
                <option value="salad">🥗 Salad</option>
                <option value="beverage">🥤 Beverage</option>
                <option value="setMeal">🍱 Set Meal</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Description *</label>
              <input
                type="text"
                placeholder="Item description"
                className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={handleAdd} 
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              {editingId ? "Update Item" : "Add Item"}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null)
                  setFormData({ id: "", name: "", description: "", price: 0, category: "coffee" })
                }}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Menu List */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Menu Items ({menu.length})</h3>
          {menu.length === 0 ? (
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 rounded-2xl p-12 text-center">
              <p className="text-gray-400 text-lg">No menu items yet. Add one to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menu.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all group hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">{item.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                    <div>
                      <span className="inline-block px-3 py-1 bg-purple-600/30 border border-purple-500/50 text-purple-300 text-xs font-semibold rounded-full">
                        {item.category}
                      </span>
                      <p className="font-bold text-2xl text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text mt-2">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(item)} 
                        className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg transition-all transform hover:scale-110"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg transition-all transform hover:scale-110"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
