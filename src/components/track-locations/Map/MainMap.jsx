import { useEffect, useState, useRef, useCallback } from "react"
import { useFormikContext } from "formik"
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  TrafficLayer,
} from "@react-google-maps/api"
import MarkerIcon from "./MarkerIcon"
import SectorMarker from "./SectorMarker"
import { MAP_CONFIG, MAP_STYLES, ORGANIZATION_ICONS } from "./constants"

// Utility functions
const parseCoordinate = (coord) => {
  if (!coord || coord === "0") return null
  const parsed = parseFloat(coord)
  return !isNaN(parsed) && parsed !== 0 ? parsed : null
}

const hasValidCoordinates = (lat, lng) => lat !== null && lng !== null

const getOrganizationIcon = (organizationId) =>
  ORGANIZATION_ICONS[organizationId] || ORGANIZATION_ICONS.default

// Custom hooks
const useSystemDarkMode = () => {
  const [systemDarkMode, setSystemDarkMode] = useState(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e) => setSystemDarkMode(e.matches)

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return systemDarkMode
}

const useMapControls = (effectiveDarkMode) => {
  const mapRef = useRef(null)

  const getMapOptions = useCallback(
    () => ({
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      styles: effectiveDarkMode ? MAP_STYLES.dark : MAP_STYLES.light,
      gestureHandling: "cooperative",
      mapTypeControlOptions: {
        style: window.google?.maps?.MapTypeControlStyle?.HORIZONTAL_BAR,
        position: window.google?.maps?.ControlPosition?.TOP_RIGHT,
      },
      zoomControlOptions: {
        position: window.google?.maps?.ControlPosition?.RIGHT_TOP,
      },
      streetViewControlOptions: {
        position: window.google?.maps?.ControlPosition?.RIGHT_TOP,
      },
      fullscreenControlOptions: {
        position: window.google?.maps?.ControlPosition?.TOP_RIGHT,
      },
    }),
    [effectiveDarkMode]
  )

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map
      map.setOptions(getMapOptions())
    },
    [getMapOptions]
  )

  const onUnmount = useCallback(() => {
    mapRef.current = null
  }, [])

  return { mapRef, onLoad, onUnmount, getMapOptions }
}

// Data filtering hooks
const useFilteredData = (mainDataLocation, values) => {
  const filterSectors = useCallback(
    (sectors) => {
      if (!sectors) return []

      return sectors.filter((sector) => {
        const menaCoords = {
          lat: parseCoordinate(sector.longitude),
          lng: parseCoordinate(sector.latitude),
        }
        const arafaCoords = {
          lat: parseCoordinate(sector.arafah_longitude),
          lng: parseCoordinate(sector.arafah_latitude),
        }

        const hasMena = hasValidCoordinates(menaCoords.lat, menaCoords.lng)
        const hasArafa = hasValidCoordinates(arafaCoords.lat, arafaCoords.lng)

        const location = values.locationHajj
        if (location === "عرفة" || location === "Arfa") return hasArafa
        if (location === "منى" || location === "Mena") return hasMena
        return hasMena || hasArafa
      })
    },
    [values.locationHajj]
  )

  const filterLocationsAndSectors = useCallback(() => {
    let filteredLocations = mainDataLocation?.locations || []

    if (values.type_actions) {
      filteredLocations = filteredLocations.filter(
        (location) => location.location_type === values.type_actions
      )
    }

    const actions = values.Actions
    const showSectors =
      actions === "القطاعات" ||
      actions === "Sectors" ||
      actions === "جميع الإجراءات" ||
      actions === "AllActions"
    const showLocations =
      actions === "المرشدين" ||
      actions === "actionMentors" ||
      actions === "جميع الإجراءات" ||
      actions === "AllActions"

    return { showSectors, showLocations, filteredLocations }
  }, [mainDataLocation?.locations, values.type_actions, values.Actions])

  const sectorsData = filterSectors(mainDataLocation?.sectors_table || [])
  const { showSectors, showLocations, filteredLocations } =
    filterLocationsAndSectors()

  const validLocations = filteredLocations.filter((loc) => {
    const lat = parseCoordinate(loc.longitude)
    console.log("🚀 ~ validLocations ~ loc:", loc)
    const lng = parseCoordinate(loc.latitude)
    return hasValidCoordinates(lat, lng)
  })

  return { sectorsData, showSectors, showLocations, validLocations }
}

// Main component
function MainMap({ resetMap, mainDataLocation, isDarkMode }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: MAP_CONFIG.libraries,
    language: MAP_CONFIG.language,
    region: MAP_CONFIG.region,
  })

  const { values } = useFormikContext()
  const systemDarkMode = useSystemDarkMode()
  const effectiveDarkMode =
    isDarkMode !== undefined ? isDarkMode : systemDarkMode
  const { mapRef, onLoad, onUnmount, getMapOptions } =
    useMapControls(effectiveDarkMode)
  const { sectorsData, showSectors, showLocations, validLocations } =
    useFilteredData(mainDataLocation, values)
  console.log("🚀 ~ MainMap ~ validLocations:", validLocations)

  // Popup and traffic management
  const [activePopup, setActivePopup] = useState(null)
  const [showTraffic, setShowTraffic] = useState(false)

  const handleSectorClick = useCallback((uniqueMarkerId) => {
    setActivePopup({ type: "sector", id: uniqueMarkerId })
  }, [])

  const handleMentorClick = useCallback((mentorId) => {
    setActivePopup({ type: "mentor", id: mentorId })
  }, [])

  const handlePopupClose = useCallback(() => {
    setActivePopup(null)
  }, [])

  const handleMapClick = useCallback(() => {
    setActivePopup(null)
  }, [])

  const toggleTraffic = useCallback(() => {
    setShowTraffic((prev) => !prev)
  }, [])

  // Map effects
  useEffect(() => {
    if (mapRef.current && resetMap) {
      mapRef.current.panTo({ lat: resetMap.lat, lng: resetMap.lng })
      mapRef.current.setZoom(MAP_CONFIG.defaultZoom)
    }
  }, [resetMap])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setOptions(getMapOptions())
    }
  }, [getMapOptions])

  if (!isLoaded) {
    return (
      <div className="map-loading">
        جاري تحميل الخريطة...
        <style jsx>{`
          .map-loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: 18px;
            font-family: "Tajawal", Arial, sans-serif;
            direction: rtl;
            color: #666;
          }
        `}</style>
      </div>
    )
  }

  const renderSectorMarkers = () => {
    return sectorsData.map((sector, idx) => {
      const markers = []
      const shouldShowMena = ["الجميع", "All", "منى", "Mena"].includes(
        values.locationHajj
      )
      const shouldShowArafa = ["الجميع", "All", "عرفة", "Arfa"].includes(
        values.locationHajj
      )

      // Mena marker
      const menaCoords = {
        lat: parseCoordinate(sector.longitude),
        lng: parseCoordinate(sector.latitude),
      }
      if (
        shouldShowMena &&
        hasValidCoordinates(menaCoords.lat, menaCoords.lng)
      ) {
        const uniqueMarkerId = `${sector.id}-mena`
        markers.push(
          <SectorMarker
            key={`mena-${sector.id}-${idx}`}
            position={menaCoords}
            sectorId={sector.id}
            uniqueMarkerId={uniqueMarkerId}
            organizationId={sector.organization_id}
            onMarkerClick={handleSectorClick}
            onPopupClose={handlePopupClose}
            isOpen={
              activePopup?.type === "sector" &&
              activePopup?.id === uniqueMarkerId
            }
            icon={getOrganizationIcon(sector.organization_id)}
            sightNumber={sector.sight}
            labelName={sector?.label}
            nationality={sector?.nationality}
          />
        )
      }

      // Arafa marker
      const arafaCoords = {
        lat: parseCoordinate(sector.arafah_longitude),
        lng: parseCoordinate(sector.arafah_latitude),
      }
      if (
        shouldShowArafa &&
        hasValidCoordinates(arafaCoords.lat, arafaCoords.lng)
      ) {
        const uniqueMarkerId = `${sector.id}-arafa`
        markers.push(
          <SectorMarker
            key={`arafa-${sector.id}-${idx}`}
            position={arafaCoords}
            sectorId={sector.id}
            uniqueMarkerId={uniqueMarkerId}
            organizationId={sector.organization_id}
            onMarkerClick={handleSectorClick}
            onPopupClose={handlePopupClose}
            isOpen={
              activePopup?.type === "sector" &&
              activePopup?.id === uniqueMarkerId
            }
            icon={getOrganizationIcon(sector.organization_id)}
            sightNumber={sector.sight}
            labelName={sector?.label}
            nationality={sector?.nationality}
          />
        )
      }

      return markers
    })
  }

  return (
    <div style={{ direction: "rtl" }}>
      {/* Traffic Control Button */}
      <div className="traffic-control">
        <button
          onClick={toggleTraffic}
          className={`traffic-btn ${showTraffic ? "active" : ""}`}
          title={showTraffic ? "إخفاء حركة المرور" : "إظهار حركة المرور"}
        >
          🚦 حركة المرور
        </button>
      </div>

      <GoogleMap
        mapContainerStyle={MAP_CONFIG.containerStyle}
        center={resetMap}
        zoom={MAP_CONFIG.defaultZoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={getMapOptions()}
      >
        {/* Traffic Layer */}
        {showTraffic && <TrafficLayer />}

        {/* Default center marker - commented out as per your code */}
        {/* <MarkerF
          position={resetMap}
          icon={{
            url: ORGANIZATION_ICONS.default,
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 32),
          }}
        /> */}

        {/* Location markers */}
        {showLocations &&
          validLocations.map((pos, idx) => {
            const coords = {
              lat: parseCoordinate(pos.latitude),
              lng: parseCoordinate(pos.longitude),
            }

            if (!hasValidCoordinates(coords.lat, coords.lng)) return null
            console.log("🚀 ~ validLocations.map ~ coords:", coords)

            return (
              <MarkerIcon
                key={`location-${pos.id}-${idx}`}
                position={coords}
                mentorId={pos.id}
                locationType={pos.location_type}
                onMarkerClick={handleMentorClick}
                onPopupClose={handlePopupClose}
                isOpen={
                  activePopup?.type === "mentor" && activePopup?.id === pos.id
                }
              />
            )
          })}

        {/* Sector markers */}
        {showSectors && renderSectorMarkers()}
      </GoogleMap>

      <style jsx>{`
        .traffic-control {
          position: absolute;
          top: 230px;
          right: 10px;
          z-index: 100;
          font-family: "Tajawal", Arial, sans-serif;
        }

        .traffic-btn {
          background: white;
          border: 2px solid #dadce0;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
          color: #3c4043;
          direction: rtl;
          font-family: "Tajawal", Arial, sans-serif;
        }

        .traffic-btn:hover {
          background: #f8f9fa;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .traffic-btn.active {
          background: #1a73e8;
          color: white;
          border-color: #1a73e8;
        }

        .traffic-btn.active:hover {
          background: #1557b0;
          border-color: #1557b0;
        }
      `}</style>
    </div>
  )
}

export default MainMap
