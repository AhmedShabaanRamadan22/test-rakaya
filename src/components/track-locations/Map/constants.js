export const MAP_CONFIG = {
  containerStyle: { width: "100%", height: "100vh" },
  libraries: ["places"],
  defaultZoom: 13,
  language: "ar",
  region: "SA",
}

export const MAP_STYLES = {
  dark: [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#424242" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#424242" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#2e2e2e" }],
    },
  ],
  light: [],
}

export const ORGANIZATION_ICONS = {
  1: "/pins/pins/albiteGust.png",
  2: "/pins/pins/IthraaKhair.png",
  5: "/pins/pins/Thakher.png",
  6: "/pins/pins/Rawaf.png",
  7: "/pins/pins/MCDC.png",
  8: "/pins/pins/IthraaJoud.png",
  default: "/pins/pins/default.png",
}

export const LOCATION_ICONS = {
  Ticket: "/pins/pins/ticket.png",
  Support: "/pins/pins/support.png",
  Assist: "/pins/pins/support.png",
  SubmittedSection: "/pins/pins/forms.png",
  Fine: "/pins/pins/fine.png",
  MealOrganizationStage: "/pins/pins/meals.png",
  default: "/pins/pins/default.png",
}

export const LOCATION_TYPES_AR = {
  Ticket: "بلاغ",
  Support: "طلب اسناد",
  Assist: " دعم لطلب الاسناد",
  SubmittedSection: "استمارات مسلمة",
  Fine: "مخالفة",
  MealOrganizationStage: "مرحلة وجبة",
}

export const TOOLTIP_STYLES = {
  background: "rgba(0, 0, 0, 0.8)",
  color: "white",
    padding: "6px 10px",
  width: "max-content",
  borderRadius: "4px",
  fontSize: "11px",
  whiteSpace: "nowrap",
  transform: "translate(-20%, -100%)",
  marginTop: "-8px",
  pointerEvents: "none",
  fontFamily: '"Tajawal", Arial, sans-serif',
  direction: "rtl",
  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
  zIndex: 1000,
}

export const DEFAULT_AVATAR =
  "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png"
