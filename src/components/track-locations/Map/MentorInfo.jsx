import Image from "next/image"
import Link from "next/link"
import { extractTimeWithAmPm } from "@/utils/Helpers"
import {
  HiOutlineDeviceMobile,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineExclamationCircle,
} from "react-icons/hi"
import { DEFAULT_AVATAR, LOCATION_TYPES_AR } from "./constants"
import { object } from "yup"

const getLocationTypeArabic = (locationType) =>
  LOCATION_TYPES_AR[locationType] || locationType

// Styles object
const styles = {
  mentorContent: {
    // fontFamily: '"Tajawal", Arial, sans-serif',
    direction: "rtl",
    background: "white",
    padding: "10px",
    width: "100%",
    maxWidth: "300px",
  },

  popupHeader: {
    // textAlign: "center",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    // marginBottom: "16px",
    // paddingBottom: "16px",
  },

  avatar: {
    borderRadius: "8px",
    marginBottom: "8px",
    objectFit: "cover",
  },

  userName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 8px 0",
  },

  badge: {
    background: "#d4af37",
    color: "white",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "500",
    display: "inline-block",
  },

  infoList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  infoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
  },

  infoRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  },

  label: {
    fontSize: "14px",
    color: "#d4af37",
    fontWeight: "500",
  },

  icon: {
    fontSize: "16px",
    color: "#d4af37",
  },

  infoLeft: {
    flex: 1,
    textAlign: "left",
    direction: "ltr",
  },

  value: {
    fontSize: "14px",
    color: "#333",
    fontWeight: "500",
  },

  phone: {
    color: "#333",
    textDecoration: "none",
  },

  event: {
    textAlign: "right",
    direction: "rtl",
    maxWidth: "150px",
    wordBreak: "break-word",
    lineHeight: "1.2",
  },
}
const InfoRow = ({ icon: Icon, label, children, isMonitors = false }) => (
  <div className={`info-row ${isMonitors ? "monitors-row" : ""}`}>
    <span className="info-label">
      <Icon className="label-icon" />
      {label}:
    </span>
    {children}
  </div>
)

const MentorInfo = ({ mentorData, locationType }) => {
  if (!mentorData) return null

  const { user_info: userData, ...locationData } = mentorData

  return (
    <div style={styles.mentorContent}>
      {/* Header */}
      <div style={{}}>
        <div style={styles.popupHeader}>
          <Image
            src={userData?.profile_photo || DEFAULT_AVATAR}
            alt="user avatar"
            width={60}
            height={ 60 }
            
            style={styles.avatar}
          />
          <div>
            <h3 style={styles.userName}>{userData?.name}</h3>
            <p style={styles.badge}>{getLocationTypeArabic(locationType)}</p>
          </div>
        </div>
      </div>

      {/* Info List */}
      <div style={styles.infoList}>
        <InfoRow icon={HiOutlineDeviceMobile} label="نوع الجهاز">
          <span className="info-value">{locationData.device}</span>
        </InfoRow>

        <InfoRow icon={HiOutlinePhone} label="رقم الهاتف">
          <span className="info-value">
            {" "}
            <Link
              href={`tel:${userData?.phone}`}
              style={{ ...styles.value, ...styles.phone }}
            >
              {userData?.phone}
            </Link>
          </span>
        </InfoRow>

        <InfoRow icon={HiOutlineCalendar} label="تاريخ العملية">
          <span className="info-value">
            {" "}
            {locationData.action_time?.slice(0, 10)}
          </span>
        </InfoRow>

        <InfoRow icon={HiOutlineClock} label="وقت العملية">
          <span className="info-value">
            {" "}
            {extractTimeWithAmPm(locationData.action_time)}
          </span>
        </InfoRow>

        <InfoRow icon={HiOutlineExclamationCircle} label=" الحدث">
          <span className="info-value">{locationData.action}</span>
        </InfoRow>
      </div>
    </div>
  )
}

export default MentorInfo

 


