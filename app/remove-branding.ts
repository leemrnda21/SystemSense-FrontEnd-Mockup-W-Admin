// Utility to remove v0 branding - can be imported in any component if needed
export function removeV0Branding() {
  if (typeof window === "undefined") return

  const selectors = [
    "[data-v0-builder]",
    "[data-v0-t]",
    "[data-v0]",
    '[class*="v0-"]',
    '[id*="v0-"]',
    'a[href*="v0.dev"]',
    'a[href*="vercel.ai"]',
    '[aria-label*="v0"]',
    '[title*="Built with v0"]',
    '[title*="v0"]',
    ".v0-watermark",
    ".v0-badge",
  ]

  selectors.forEach((selector) => {
    try {
      const elements = document.querySelectorAll(selector)
      elements.forEach((el) => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })
    } catch (e) {
      // Ignore errors silently
    }
  })
}

// Auto-run on module load
if (typeof window !== "undefined") {
  removeV0Branding()

  // Set up periodic checking
  setInterval(removeV0Branding, 1000)

  // Set up mutation observer
  const observer = new MutationObserver(removeV0Branding)
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }
}
