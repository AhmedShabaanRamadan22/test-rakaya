import { useState, useEffect } from "react"

/**
 * Custom hook for managing tooltip state and interactions
 * @param {boolean} isOpen - Whether the main popup is open
 * @param {string} tooltipText - Text to show in tooltip (optional)
 * @param {number} showDelay - Delay before showing tooltip (ms)
 * @param {number} hideDelay - Delay before hiding tooltip (ms)
 * @returns {object} Tooltip state and handlers
 */
const useTooltip = (
  isOpen,
  tooltipText = null,
  showDelay = 500,
  hideDelay = 200
) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState(null)

  const handleMouseOver = () => {
    // Only show tooltip if popup is not open and tooltip text exists
    if (!isOpen && (tooltipText || tooltipText === "")) {
      const timeout = setTimeout(() => setShowTooltip(true), showDelay)
      setHoverTimeout(timeout)
    }
  }

  const handleMouseOut = () => {
    // Clear any pending show timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }

    // Hide tooltip after delay
    setTimeout(() => setShowTooltip(false), hideDelay)
  }

  const hideTooltip = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setShowTooltip(false)
  }

  const showTooltipInstantly = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setShowTooltip(true)
  }

  // Hide tooltip when popup opens
  useEffect(() => {
    if (isOpen) {
      hideTooltip()
    }
  }, [isOpen])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  return {
    showTooltip,
    handleMouseOver,
    handleMouseOut,
    hideTooltip,
    showTooltipInstantly,
  }
}

export default useTooltip
