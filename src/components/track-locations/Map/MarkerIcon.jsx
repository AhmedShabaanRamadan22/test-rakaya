import { useState, useEffect } from "react"
import { MarkerF, InfoWindowF, OverlayView } from "@react-google-maps/api"
import useFetch from "@/hooks/useFetch"
import { FaSpinner } from "react-icons/fa"
import MentorInfo from "./MentorInfo"
import { LOCATION_ICONS, LOCATION_TYPES_AR } from "./constants"

// Constants - استيراد من constants.js
const TOOLTIP_STYLES_LOCAL = {
  background: "rgba(0, 0, 0, 0.8)",
  color: "white",
  padding: "6px 10px",
  borderRadius: "4px",
  fontSize: "11px",
  whiteSpace: "nowrap",
  transform: "translate(-50%, -100%)",
  marginTop: "-8px",
  pointerEvents: "none",
  fontFamily: '"Tajawal", Arial, sans-serif',
  direction: "rtl",
  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
  zIndex: 1000,
}

// Custom hook for tooltip management
const useTooltip = (isOpen, hasTooltipText) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState(null)

  const handleMouseOver = () => {
    if (!isOpen && hasTooltipText) {
      const timeout = setTimeout(() => setShowTooltip(true), 500)
      setHoverTimeout(timeout)
    }
  }

  const handleMouseOut = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setTimeout(() => setShowTooltip(false), 200)
  }

  const hideTooltip = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setShowTooltip(false)
  }

  useEffect(() => {
    if (isOpen) hideTooltip()
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout)
    }
  }, [hoverTimeout])

  return { showTooltip, handleMouseOver, handleMouseOut, hideTooltip }
}

// Utility functions
const getIconUrl = (locationType) =>
  LOCATION_ICONS[locationType] || LOCATION_ICONS.default

const getLocationTypeArabic = (locationType) =>
  LOCATION_TYPES_AR[locationType] || locationType

// Loading component
const LoadingSpinner = () => (
  <div className="loading-container">
    <FaSpinner className="spinner-icon" />
    <p className="loading-text">جاري التحميل...</p>
    <style jsx>{`
      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30px;
      }
      .spinner-icon {
        font-size: 24px;
        color: #6b8e6b;
        animation: spin 1s linear infinite;
        margin-bottom: 12px;
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .loading-text {
        color: #666;
        font-size: 14px;
        margin: 0;
      }
    `}</style>
  </div>
)

// Tooltip component
const MentorTooltip = ({ position, locationType, tooltipText, show }) => {
  if (!show || !tooltipText) return null

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div style={TOOLTIP_STYLES_LOCAL}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span>
            {getLocationTypeArabic(locationType)}: {tooltipText}
          </span>
        </div>
      </div>
    </OverlayView>
  )
}

// Main component
const MarkerIcon = ({
  position,
  mentorId,
  locationType,
  onMarkerClick,
  onPopupClose,
  isOpen,
  tooltipText,
}) => {
  const { showTooltip, handleMouseOver, handleMouseOut, hideTooltip } =
    useTooltip(isOpen, !!tooltipText)

  const { data: mentorResponse, isLoading } = useFetch({
    endpoint: `location/${mentorId}`,
    queryKey: [`location/${mentorId}`],
    enabled: !!mentorId && isOpen,
  })

  const handleMarkerClick = () => {
    hideTooltip()
    onMarkerClick(mentorId)
  }

  const mentorData = mentorResponse?.data?.location

  return (
    <>
      <MarkerF
        position={position}
        onClick={handleMarkerClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        icon={{
          url: getIconUrl(locationType),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 32),
        }}
      />

      <MentorTooltip
        position={position}
        locationType={locationType}
        tooltipText={tooltipText}
        show={showTooltip && !isOpen}
      />

      {isOpen && (
        <InfoWindowF
          position={position}
          onCloseClick={onPopupClose}
          options={{ maxWidth: 350 }}
        >
          <div className="mentor-popup">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <MentorInfo mentorData={mentorData} locationType={locationType} />
            )}
            <style jsx>{`
              .mentor-popup {
                font-family: "Tajawal", Arial, sans-serif;
                direction: rtl;
                background: white;
                border-radius: 15px;
                overflow: hidden;
                min-width: 280px;
              }
            `}</style>
          </div>
        </InfoWindowF>
      )}
    </>
  )
}

export default MarkerIcon
