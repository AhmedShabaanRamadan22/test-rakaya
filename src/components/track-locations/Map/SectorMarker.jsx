import { useState, useEffect } from "react"
import { MarkerF, InfoWindowF, OverlayView } from "@react-google-maps/api"
import { useRouter } from "next/router"
import useFetch from "@/hooks/useFetch"
import { FaSpinner } from "react-icons/fa"
import { HiOutlineHashtag } from "react-icons/hi"
import SectorInfo from "./SectorInfo"
import { ORGANIZATION_ICONS, TOOLTIP_STYLES } from "./constants"


const useTooltip = (isOpen, sightNumber) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState(null)

  const handleMouseOver = () => {
    if (!isOpen && sightNumber) {
      const timeout = setTimeout(() => setShowTooltip(true), 200)
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

const getIconUrl = (organizationId, customIcon) =>
  customIcon || ORGANIZATION_ICONS[organizationId] || ORGANIZATION_ICONS.default

const handleNavigation = (url, router) => {
  if (!url?.trim()) {
    console.error("Invalid URL:", url)
    alert("الموقع غير متاح حاليًا")
    return
  }

  if (url.startsWith("http")) {
    window.open(url, "_blank")
  } else {
    router.push(url)
  }
}

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

const SightTooltip = ({
  position,
  sightNumber,
  show,
  labelName,
  nationality,
}) => {
  if (!show || !sightNumber) return null

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div style={TOOLTIP_STYLES}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <HiOutlineHashtag style={{ fontSize: "12px", color: "#c9b171" }} />
          <span> {labelName}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <HiOutlineHashtag style={{ fontSize: "12px", color: "#c9b171" }} />
          <span> {nationality}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <HiOutlineHashtag style={{ fontSize: "12px", color: "#c9b171" }} />
          <span>الشاخص: {sightNumber}</span>
        </div>
      </div>
    </OverlayView>
  )
}

const SectorMarker = ({
  position,
  sectorId,
  uniqueMarkerId,
  organizationId,
  onMarkerClick,
  onPopupClose,
  isOpen,
  icon,
  sightNumber,
  labelName,
  nationality,
}) => {
  const router = useRouter()
  const { showTooltip, handleMouseOver, handleMouseOut, hideTooltip } =
    useTooltip(isOpen, sightNumber)

  const { data: sectorResponse, isLoading } = useFetch({
    endpoint: `sector/${sectorId}`,
    queryKey: [`sector/${sectorId}`],
    enabled: !!sectorId && isOpen,
  })

  const handleMarkerClick = () => {
    hideTooltip()
    onMarkerClick(uniqueMarkerId)
  }

  const sectorData = sectorResponse?.data?.sector

  return (
    <>
      <MarkerF
        position={position}
        onClick={handleMarkerClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        icon={{
          url: getIconUrl(organizationId, icon),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 32),
        }}
      />

      <SightTooltip
        position={position}
        sightNumber={sightNumber || sectorData?.sight}
        labelName={labelName}
        nationality={nationality}
        show={showTooltip && !isOpen}
      />

      {isOpen && (
        <InfoWindowF
          position={position}
          onCloseClick={onPopupClose}
          options={{ maxWidth: 420 }}
        >
          <div className="sector-popup">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <SectorInfo
                sectorData={sectorData}
                onNavigation={(url) => handleNavigation(url, router)}
              />
            )}
            <style jsx>{`
              .sector-popup {
                font-family: "Tajawal", Arial, sans-serif;
                direction: rtl;
                background: white;
                border-radius: 15px;
                overflow: hidden;
                max-height: 500px;
                overflow-y: auto;
                min-width: 300px;
              }
              .sector-popup::-webkit-scrollbar {
                width: 4px;
              }
              .sector-popup::-webkit-scrollbar-track {
                background: #f1f1f1;
              }
              .sector-popup::-webkit-scrollbar-thumb {
                background: #c9b171;
                border-radius: 2px;
              }
            `}</style>
          </div>
        </InfoWindowF>
      )}
    </>
  )
}

export default SectorMarker
