import { create } from "zustand"

export type Language = "en" | "ja" | "th"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  vegetarian?: boolean
}

interface CartItem extends MenuItem {
  quantity: number
}

interface MenuState {
  language: Language
  setLanguage: (lang: Language) => void
  cart: CartItem[]
  addToCart: (item: MenuItem, quantity: number) => void
  removeFromCart: (id: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  menuItems: MenuItem[]
  setMenuItems: (items: MenuItem[]) => void
}

export const useMenuStore = create<MenuState>((set) => ({
  language: "en",
  setLanguage: (lang) => set({ language: lang }),
  cart: [],
  addToCart: (item, quantity) =>
    set((state) => {
      const existingItem = state.cart.find((ci) => ci.id === item.id)
      if (existingItem) {
        return {
          cart: state.cart.map((ci) => (ci.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci)),
        }
      }
      return {
        cart: [...state.cart, { ...item, quantity }],
      }
    }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((ci) => ci.id !== id) })),
  updateCartQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { cart: state.cart.filter((ci) => ci.id !== id) }
      }
      return {
        cart: state.cart.map((ci) => (ci.id === id ? { ...ci, quantity } : ci)),
      }
    }),
  clearCart: () => set({ cart: [] }),
  menuItems: [],
  setMenuItems: (items) => set({ menuItems: items }),
}))
