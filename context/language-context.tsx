"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export const translations = {
  en: {
    menu: "Menu",
    allItems: "All",
    coffee: "Coffee",
    food: "Food",
    salad: "Salad",
    beverage: "Beverage",
    pastry: "Pastry",
    setMeal: "Set Meal",
    addToCart: "Add to Cart",
    cart: "Cart",
    back: "Back",
    quantity: "Quantity",
    orderConfirmed: "Order Confirmed!",
    total: "Total",
    checkout: "Checkout",
    language: "Language",
    empty: "Empty",
    description: "Description",
    price: "Price",
    vegetarian: "Vegetarian",
    orderHistory: "Order History",
    reorder: "Re-order",
  },
  ja: {
    menu: "メニュー",
    allItems: "すべて",
    coffee: "コーヒー",
    food: "フード",
    salad: "サラダ",
    beverage: "ドリンク",
    pastry: "ペストリー",
    setMeal: "セットメニュー",
    addToCart: "カートに追加",
    cart: "カート",
    back: "戻る",
    quantity: "数量",
    orderConfirmed: "ご注文ありがとうございます！",
    total: "合計",
    checkout: "チェックアウト",
    language: "言語",
    empty: "空です",
    description: "説明",
    price: "価格",
    vegetarian: "ベジタリアン",
    orderHistory: "注文履歴",
    reorder: "再注文",
  },
  th: {
    menu: "เมนู",
    allItems: "ทั้งหมด",
    coffee: "กาแฟ",
    food: "อาหาร",
    salad: "สลัด",
    beverage: "เครื่องดื่ม",
    pastry: "ขนมปัง",
    setMeal: "เมนูชุด",
    addToCart: "เพิ่มลงในรถเข็น",
    cart: "รถเข็น",
    back: "กลับ",
    quantity: "จำนวน",
    orderConfirmed: "ยืนยันคำสั่งซื้อแล้ว!",
    total: "รวม",
    checkout: "ชำระเงิน",
    language: "ภาษา",
    empty: "ว่าง",
    description: "คำอธิบาย",
    price: "ราคา",
    vegetarian: "เจ",
    orderHistory: "ประวัติการสั่งซื้อ",
    reorder: "สั่งซื้อใหม่",
  },
}

type Language = "en" | "ja" | "th"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.en) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
