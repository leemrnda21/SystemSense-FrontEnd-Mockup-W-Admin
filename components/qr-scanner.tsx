"use client"

import { useEffect, useRef, useState } from "react"
import { AlertCircle, Loader2 } from "lucide-react"

interface QrScannerProps {
  onDetected: (id: string) => void
}

export default function QrScanner({ onDetected }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState("")
  const [scanning, setScanning] = useState(false)
  const [jsQRLoaded, setJsQRLoaded] = useState(false)
  const detectedCodesRef = useRef(new Set<string>())

  useEffect(() => {
    const loadJsQR = async () => {
      try {
        // @ts-ignore
        window.jsQR = (await import("jsqr")).default
        setJsQRLoaded(true)
      } catch (err) {
        console.error("Failed to load jsQR:", err)
        setError("QR detection unavailable. Use demo mode.")
      }
    }

    loadJsQR()
  }, [])

  useEffect(() => {
    const startScanning = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setScanning(true)
        }
      } catch (err) {
        setError("Camera access denied. Use the demo button below.")
        console.error("Camera error:", err)
      }
    }

    startScanning()

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (!scanning || !jsQRLoaded || !videoRef.current) return

    const interval = setInterval(() => {
      if (canvasRef.current && videoRef.current) {
        const ctx = canvasRef.current.getContext("2d")
        if (ctx) {
          canvasRef.current.width = videoRef.current.videoWidth
          canvasRef.current.height = videoRef.current.videoHeight

          ctx.drawImage(videoRef.current, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)

          // @ts-ignore
          const code = window.jsQR(imageData.data, imageData.width, imageData.height)

          if (code && code.data) {
            // Prevent duplicate detections
            if (!detectedCodesRef.current.has(code.data)) {
              detectedCodesRef.current.add(code.data)
              onDetected(code.data)
            }
          }
        }
      }
    }, 300)

    return () => clearInterval(interval)
  }, [scanning, jsQRLoaded, onDetected])

  return (
    <div className="relative w-full">
      <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover" />
      <canvas ref={canvasRef} className="hidden" />

      {/* Scanning overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 border-2 border-emerald-400/50 rounded-lg"></div>
      </div>

      {/* Scanning animation */}
      {scanning && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse"></div>
        </div>
      )}

      {/* Loading state */}
      {scanning && !jsQRLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="text-center flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
            <p className="text-xs text-slate-300">Initializing scanner...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center flex flex-col items-center">
            <AlertCircle className="w-8 h-8 text-orange-400 mb-2" />
            <p className="text-sm text-slate-300">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}
