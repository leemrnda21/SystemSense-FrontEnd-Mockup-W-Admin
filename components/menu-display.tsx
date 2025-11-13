"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Clock, ShoppingCart, Trash2, Plus, Minus, Globe } from "lucide-react"
import { useMenuStore } from "@/store/menu-store"
import { translations } from "@/translations"
import type { MenuItem, CartItem } from "@/store/menu-store"

interface MenuDisplayProps {
  restaurantId: string
  onBack: () => void
}

const MOCK_MENU: MenuItem[] = [
  { id: "1", name: "Espresso", description: "Rich and bold single shot", price: 2.5, category: "coffee" },
  { id: "2", name: "Cappuccino", description: "Espresso with steamed milk and foam", price: 4.0, category: "coffee" },
  { id: "3", name: "Latte", description: "Smooth espresso with velvety milk", price: 4.5, category: "coffee" },
  {
    id: "4",
    name: "Croissant",
    description: "Buttery and flaky French pastry",
    price: 3.5,
    category: "pastry",
    vegetarian: true,
  },
  {
    id: "5",
    name: "Avocado Toast",
    description: "Smashed avocado on toasted sourdough",
    price: 7.5,
    category: "food",
    vegetarian: true,
  },
  {
    id: "6",
    name: "Grilled Cheese",
    description: "Classic cheese sandwich with tomato",
    price: 6.5,
    category: "food",
    vegetarian: true,
  },
  { id: "7", name: "Caesar Salad", description: "Fresh romaine with parmesan", price: 8.0, category: "salad" },
  {
    id: "8",
    name: "Iced Tea",
    description: "Refreshing chilled tea",
    price: 3.0,
    category: "beverage",
    vegetarian: true,
  },
  { id: "9", name: "Set Meal A", description: "Sandwich + Coffee + Pastry", price: 12.0, category: "setMeal" },
  { id: "10", name: "Set Meal B", description: "Salad + Drink + Dessert", price: 14.0, category: "setMeal" },
]

const CATEGORIES = [
  { id: "all", name: "allItems", color: "badge-outline" },
  { id: "coffee", name: "coffee", color: "bg-amber-100 text-amber-800" },
  { id: "pastry", name: "pastry", color: "bg-pink-100 text-pink-800" },
  { id: "food", name: "food", color: "bg-orange-100 text-orange-800" },
  { id: "salad", name: "salad", color: "bg-green-100 text-green-800" },
  { id: "beverage", name: "beverage", color: "bg-blue-100 text-blue-800" },
  { id: "setMeal", name: "setMeal", color: "bg-purple-100 text-purple-800" },
]

type Screen = "menu" | "item-detail" | "cart" | "confirmation" | "order-history"

export default function MenuDisplay({ restaurantId, onBack }: MenuDisplayProps) {
  const { language, setLanguage, cart, addToCart, removeFromCart, updateCartQuantity, clearCart } = useMenuStore()
  const t = (key: keyof typeof translations.en) => translations[language][key]

  const [screen, setScreen] = useState<Screen>("menu")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [itemQuantity, setItemQuantity] = useState(1)
  const [orderHistory, setOrderHistory] = useState<{ id: string; items: CartItem[]; total: number; date: string }[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU)

  // Load menu from localStorage
  useEffect(() => {
    const savedMenu = localStorage.getItem("restaurantMenu")
    if (savedMenu) {
      try {
        const parsedMenu = JSON.parse(savedMenu)
        setMenuItems(parsedMenu)
      } catch (e) {
        console.error("Failed to load menu:", e)
        setMenuItems(MOCK_MENU)
      }
    }
  }, [])

  const filteredMenu =
    selectedCategory === "all" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item, itemQuantity)
    setScreen("menu")
    setItemQuantity(1)
  }

  const handleCheckout = () => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total: cartTotal,
      date: new Date().toLocaleTimeString(),
    }
    setOrderHistory([newOrder, ...orderHistory])
    clearCart()
    setScreen("confirmation")
  }

  if (screen === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="btn btn-ghost btn-sm btn-circle text-slate-200 hover:text-white hover:bg-slate-800"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="font-bold text-xl text-white">{t("menu")}</h1>
            </div>
            <button
              onClick={() => setScreen("order-history")}
              className="btn btn-ghost btn-sm btn-circle text-slate-200 hover:text-white hover:bg-slate-800"
            >
              <Clock className="w-5 h-5" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="px-4 py-3 border-t border-slate-700 flex gap-2 items-center">
            <Globe className="w-4 h-4 text-slate-400" />
            {(["en", "ja", "th"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`btn btn-xs font-semibold transition-all ${
                  language === lang
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0"
                    : "btn-ghost text-slate-300 hover:text-white hover:bg-slate-700"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="sticky top-20 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 px-4 py-3 overflow-x-auto">
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-sm whitespace-nowrap font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? cat.color
                    : "btn-ghost text-slate-300 hover:text-white hover:bg-slate-700"
                }`}
              >
                {t(cat.name as keyof typeof translations.en)}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-6 max-w-4xl mx-auto pb-24">
          {filteredMenu.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No items in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item)
                    setItemQuantity(1)
                    setScreen("item-detail")
                  }}
                  className="group relative text-left h-full rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  {/* Background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-750 to-slate-700 border border-slate-600 group-hover:border-amber-500/50 transition-colors" />
                  
                  {/* Animated glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Content */}
                  <div className="relative p-5 h-full flex flex-col">
                    {/* Category Badge */}
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 backdrop-blur-sm border border-amber-500/30">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                      {item.vegetarian && (
                        <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                          🌱 VEG
                        </span>
                      )}
                    </div>

                    {/* Name and Description */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-300 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-600">
                      <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 group-hover:from-amber-400 group-hover:to-orange-400 text-white transition-all">
                        <Plus className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cart Button */}
        {cart.length > 0 && (
          <button
            onClick={() => setScreen("cart")}
            className="fixed bottom-6 right-6 btn btn-circle btn-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-2xl hover:shadow-amber-500/50 hover:shadow-2xl scale-110 animate-pulse"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 badge badge-error font-bold text-sm">{cart.length}</span>
          </button>
        )}
      </div>
    )
  }

  // Item detail screen
  if (screen === "item-detail" && selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setScreen("menu")}
            className="btn btn-ghost btn-sm btn-circle text-slate-200 hover:text-white hover:bg-slate-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-white">{t("menu")}</h1>
        </div>

        <div className="px-4 py-6 max-w-md mx-auto pb-32">
          <div className="rounded-3xl bg-gradient-to-br from-slate-800 to-slate-700 shadow-2xl overflow-hidden border border-slate-600">
            {/* Item Image/Icon */}
            <figure className="bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 h-48 flex items-center justify-center text-7xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12" />
              </div>
              🍽️
            </figure>
            
            <div className="p-6">
              {/* Category and Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
                  {selectedItem.category.toUpperCase()}
                </span>
                {selectedItem.vegetarian && (
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                    🌱 VEGETARIAN
                  </span>
                )}
              </div>

              {/* Name */}
              <h2 className="text-3xl font-bold text-white mb-2">{selectedItem.name}</h2>
              
              {/* Description */}
              <p className="text-slate-300 mb-6 leading-relaxed">{selectedItem.description}</p>

              {/* Price */}
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-6">
                ${selectedItem.price.toFixed(2)}
              </div>

              {/* Quantity Selector */}
              <div className="bg-slate-700/50 border border-slate-600 p-6 rounded-2xl mb-6">
                <p className="text-sm font-semibold text-slate-200 mb-4 text-center">{t("quantity")}</p>
                <div className="flex items-center gap-4 justify-center">
                  <button
                    onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                    className="btn btn-circle btn-md bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white border-0 transition-all"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-4xl font-bold text-white w-16 text-center">{itemQuantity}</span>
                  <button
                    onClick={() => setItemQuantity(itemQuantity + 1)}
                    className="btn btn-circle btn-md bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white border-0 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(selectedItem)}
                className="btn w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 text-lg font-bold shadow-lg hover:shadow-orange-500/50 transition-all mb-3"
              >
                <ShoppingCart className="w-5 h-5" />
                {t("addToCart")} - ${(selectedItem.price * itemQuantity).toFixed(2)}
              </button>

              <button
                onClick={() => setScreen("menu")}
                className="btn w-full btn-ghost text-slate-300 hover:text-white hover:bg-slate-700"
              >
                {t("back")}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Cart screen
  if (screen === "cart") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setScreen("menu")}
            className="btn btn-ghost btn-sm btn-circle text-slate-200 hover:text-white hover:bg-slate-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-white">{t("cart")}</h1>
        </div>

        <div className="px-4 py-6 max-w-md mx-auto pb-32">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">{t("empty")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 shadow-lg border border-slate-600 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-white">{item.name}</h3>
                        <p className="text-sm text-slate-300">
                          ${item.price.toFixed(2)} {t("price")}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="btn btn-ghost btn-sm btn-circle hover:bg-red-900/30 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="btn btn-xs bg-slate-600 hover:bg-slate-500 text-white border-0"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="btn btn-xs bg-slate-600 hover:bg-slate-500 text-white border-0"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-bold text-amber-400">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-slate-900/80 backdrop-blur-md border-t border-slate-700 px-4 py-4 shadow-2xl">
            <div className="max-w-md mx-auto">
              <div className="flex justify-between mb-4 font-bold text-white text-lg">
                <span>{t("total")}:</span>
                <span className="text-2xl bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="btn w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 font-bold text-lg hover:from-amber-600 hover:to-orange-600"
              >
                {t("checkout")}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Confirmation screen
  if (screen === "confirmation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="rounded-3xl bg-gradient-to-br from-slate-800 to-slate-700 shadow-2xl overflow-hidden border border-slate-600">
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-500/20 border-4 border-green-500 rounded-full flex items-center justify-center">
                  <span className="text-5xl">✓</span>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">{t("orderConfirmed")}</h2>
              <p className="text-slate-300 mb-6">Your order has been sent to the kitchen</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-3">
                ${cartTotal.toFixed(2)}
              </p>
              <p className="text-xs text-slate-400 mb-8">Order ID: ORD-{Date.now()}</p>

              <div className="bg-slate-700/50 border border-slate-600 p-6 rounded-2xl mb-8 text-left">
                <h3 className="font-bold text-white mb-4">{t("menu")}</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span className="text-amber-400">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  clearCart()
                  setScreen("menu")
                }}
                className="btn w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 font-bold text-lg hover:from-amber-600 hover:to-orange-600 mb-2"
              >
                Continue Ordering
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Order history screen
  if (screen === "order-history") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setScreen("menu")}
            className="btn btn-ghost btn-sm btn-circle text-slate-200 hover:text-white hover:bg-slate-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-white">{t("orderHistory")}</h1>
        </div>

        <div className="px-4 py-6 max-w-md mx-auto">
          {orderHistory.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">{t("empty")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 shadow-lg border border-slate-600 p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-white text-sm">{order.id}</p>
                      <p className="text-xs text-slate-400">{order.date}</p>
                    </div>
                    <p className="font-bold text-amber-400">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1 mb-3">
                    {order.items.map((item) => (
                      <p key={item.id}>
                        {item.name} x {item.quantity}
                      </p>
                    ))}
                  </div>
                  <button className="btn btn-sm btn-ghost w-full text-amber-400 hover:text-amber-300 hover:bg-slate-700">
                    {t("reorder")}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}
