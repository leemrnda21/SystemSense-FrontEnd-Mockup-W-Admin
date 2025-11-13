"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { History, Trash2, Copy, Check, X } from "lucide-react"

type Operation = "+" | "-" | "×" | "÷" | null

interface HistoryItem {
  expression: string
  result: string
}

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<Operation>(null)
  const [newNumber, setNewNumber] = useState(true)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleNumber(e.key)
      } else if (e.key === ".") {
        handleDecimal()
      } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        const op = e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key
        handleOperation(op as Operation)
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault()
        handleEquals()
      } else if (e.key === "Escape") {
        handleClear()
      } else if (e.key === "Backspace") {
        handleBackspace()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [display, previousValue, operation, newNumber])

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num)
      setNewNumber(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.")
      setNewNumber(false)
    } else if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const handleOperation = (op: Operation) => {
    const current = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(current)
    } else if (operation && !newNumber) {
      const result = calculate(previousValue, current, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(op)
    setNewNumber(true)
  }

  const calculate = (prev: number, current: number, op: Operation): number => {
    switch (op) {
      case "+":
        return prev + current
      case "-":
        return prev - current
      case "×":
        return prev * current
      case "÷":
        return prev / current
      default:
        return current
    }
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const current = Number.parseFloat(display)
      const result = calculate(previousValue, current, operation)

      const expression = `${previousValue} ${operation} ${current}`
      const resultStr = String(result)

      setHistory([{ expression, result: resultStr }, ...history.slice(0, 9)])
      setDisplay(resultStr)
      setPreviousValue(null)
      setOperation(null)
      setNewNumber(true)
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setNewNumber(true)
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay("0")
      setNewNumber(true)
    }
  }

  const handlePercentage = () => {
    const current = Number.parseFloat(display)
    setDisplay(String(current / 100))
  }

  const handleNegate = () => {
    const current = Number.parseFloat(display)
    setDisplay(String(current * -1))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <div className="w-full max-w-md mx-auto px-2 sm:px-4">
      {/* iOS Style Calculator - Mobile Optimized */}
      <div className="bg-black rounded-[32px] sm:rounded-[40px] p-4 sm:p-6 shadow-2xl overflow-hidden">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-3 sm:mb-4 text-white text-xs sm:text-sm px-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="hover:opacity-70 transition-opacity active:scale-95 touch-manipulation"
              aria-label="Toggle history"
            >
              <History className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            {copied && (
              <div className="flex items-center gap-1 text-[10px] xs:text-xs text-green-400">
                <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Copied</span>
              </div>
            )}
          </div>
          <div className="text-[10px] xs:text-xs opacity-50">Calculator</div>
        </div>

        {/* Display */}
        <div className="mb-4 sm:mb-6 px-2 sm:px-4">
          <div className="text-right">
            {operation && (
              <div className="text-sm sm:text-base md:text-lg text-gray-400 mb-1 font-light overflow-x-auto scrollbar-hide">
                {previousValue} {operation}
              </div>
            )}
            <div className="flex items-end justify-end gap-2">
              <div className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-extralight text-white tracking-tight break-all overflow-x-auto scrollbar-hide max-w-full">
                {display.length > 9 ? display.slice(0, 9) + "..." : display}
              </div>
              <button
                onClick={copyToClipboard}
                className="mb-2 sm:mb-3 hover:opacity-70 transition-opacity text-gray-400 active:scale-95 touch-manipulation flex-shrink-0"
                aria-label="Copy to clipboard"
              >
                <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="mb-4 sm:mb-6 px-2 sm:px-4 max-h-48 sm:max-h-64 overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs sm:text-sm font-medium text-gray-400">History</h3>
              <div className="flex gap-2">
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-[10px] xs:text-xs text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-1 active:scale-95 touch-manipulation"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">Clear</span>
                  </button>
                )}
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-orange-500 hover:text-orange-400 transition-colors active:scale-95 touch-manipulation"
                  aria-label="Close history"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
            {history.length === 0 ? (
              <p className="text-xs sm:text-sm text-gray-500 text-center py-4">No calculations yet</p>
            ) : (
              <div className="space-y-2">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="text-xs sm:text-sm p-2 sm:p-3 rounded-2xl bg-gray-900 hover:bg-gray-800 cursor-pointer transition-colors active:scale-98 touch-manipulation"
                    onClick={() => {
                      setDisplay(item.result)
                      setNewNumber(true)
                    }}
                  >
                    <div className="text-gray-500 text-[10px] xs:text-xs overflow-x-auto scrollbar-hide">
                      {item.expression}
                    </div>
                    <div className="font-medium text-white mt-1 text-xs sm:text-sm overflow-x-auto scrollbar-hide">
                      {item.result}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {/* Row 1 */}
          <IOSButton onClick={handleClear} variant="function">
            AC
          </IOSButton>
          <IOSButton onClick={handleNegate} variant="function">
            +/−
          </IOSButton>
          <IOSButton onClick={handlePercentage} variant="function">
            %
          </IOSButton>
          <IOSButton onClick={() => handleOperation("÷")} variant="operation" active={operation === "÷"}>
            ÷
          </IOSButton>

          {/* Row 2 */}
          <IOSButton onClick={() => handleNumber("7")} variant="number">
            7
          </IOSButton>
          <IOSButton onClick={() => handleNumber("8")} variant="number">
            8
          </IOSButton>
          <IOSButton onClick={() => handleNumber("9")} variant="number">
            9
          </IOSButton>
          <IOSButton onClick={() => handleOperation("×")} variant="operation" active={operation === "×"}>
            ×
          </IOSButton>

          {/* Row 3 */}
          <IOSButton onClick={() => handleNumber("4")} variant="number">
            4
          </IOSButton>
          <IOSButton onClick={() => handleNumber("5")} variant="number">
            5
          </IOSButton>
          <IOSButton onClick={() => handleNumber("6")} variant="number">
            6
          </IOSButton>
          <IOSButton onClick={() => handleOperation("-")} variant="operation" active={operation === "-"}>
            −
          </IOSButton>

          {/* Row 4 */}
          <IOSButton onClick={() => handleNumber("1")} variant="number">
            1
          </IOSButton>
          <IOSButton onClick={() => handleNumber("2")} variant="number">
            2
          </IOSButton>
          <IOSButton onClick={() => handleNumber("3")} variant="number">
            3
          </IOSButton>
          <IOSButton onClick={() => handleOperation("+")} variant="operation" active={operation === "+"}>
            +
          </IOSButton>

          {/* Row 5 */}
          <IOSButton onClick={() => handleNumber("0")} variant="number" wide>
            0
          </IOSButton>
          <IOSButton onClick={handleDecimal} variant="number">
            .
          </IOSButton>
          <IOSButton onClick={handleEquals} variant="operation">
            =
          </IOSButton>
        </div>
      </div>
    </div>
  )
}

interface IOSButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant: "number" | "operation" | "function"
  wide?: boolean
  active?: boolean
}

function IOSButton({ children, onClick, variant, wide = false, active = false }: IOSButtonProps) {
  const baseClasses =
    "h-16 sm:h-18 md:h-20 text-2xl sm:text-3xl font-light transition-all active:opacity-50 rounded-full touch-manipulation flex items-center justify-center"

  const variantClasses = {
    number: "bg-[#333333] text-white hover:bg-[#404040]",
    operation: active ? "bg-white text-[#FF9500]" : "bg-[#FF9500] text-white hover:bg-[#FFB143]",
    function: "bg-[#A5A5A5] text-black hover:bg-[#BEBEBE]",
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${wide ? "col-span-2" : ""}`}>
      {children}
    </button>
  )
}
