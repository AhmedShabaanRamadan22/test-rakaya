import Image from "next/image"
import {
  HiOutlineOfficeBuilding,
  HiOutlineUser,
  HiOutlineStar,
  HiOutlineUserGroup,
  HiOutlineFlag,
  HiOutlineUsers,
  HiOutlineCollection,
  HiOutlineHashtag,
  HiOutlineEye,
  HiOutlineCamera,
} from "react-icons/hi"

// Info row component
const InfoRow = ({ icon: Icon, label, children, isMonitors = false }) => (
  <div className={`info-row ${isMonitors ? "monitors-row" : ""}`}>
    <span className="info-label">
      <Icon className="label-icon" />
      {label}:
    </span>
    {children}
  </div>
)

// Monitor badges component
const MonitorBadges = ({ monitors }) => {
  if (!monitors?.length) {
    return <span className="info-value">لايوجد مراقبين</span>
  }

  return (
    <div className="monitors-container">
      {monitors.map((monitor) => (
        <span key={monitor.id} className="monitor-badge">
          {monitor.name}
        </span>
      ))}
    </div>
  )
}

// Nationality display component
const NationalityDisplay = ({ nationality, flagIcon }) => (
  <div className="nationality-value">
    <span>{nationality}</span>
    {flagIcon && (
      <Image
        src={flagIcon}
        alt="flag"
        width={16}
        height={12}
        className="flag-icon"
      />
    )}
  </div>
)

// Location buttons component
const LocationButtons = ({ sectorData, onNavigation }) => (
  <div className="location-buttons">
    <button
      onClick={() => onNavigation(sectorData?.location)}
      disabled={!sectorData?.location}
      className="location-btn arafah-btn"
      style={{ background: sectorData?.organization?.primary_color }}
    >
      موقع منى
    </button>
    <button
      onClick={() => onNavigation(sectorData?.arafah_location)}
      disabled={!sectorData?.arafah_location}
      className="location-btn mena-btn"
      style={{ background: sectorData?.organization?.primary_color }}
    >
      موقع عرفة
    </button>
  </div>
)

// Main SectorInfo component
const SectorInfo = ({ sectorData, onNavigation }) => {
  if (!sectorData) return null

  return (
    <div className="sector-content">
      {/* Header */}
      <div className="sector-header">
        <div className="logo-container">
          <Image
            src={sectorData.organization?.logo || "/default-logo.png"}
            width={60}
            height={60}
            alt="organization logo"
            className="organization-logo"
          />
        </div>

        <div
          className="sector-title-bar"
          style={{
            backgroundColor:
              sectorData.organization?.primary_color || "#6B8E6B",
          }}
        >
          <h2 className="sector-title">
            {sectorData.label} - {sectorData.facility_name}
          </h2>
        </div>
      </div>

      {/* Info List */}
      <div className="info-list">
        <InfoRow icon={HiOutlineOfficeBuilding} label="المنظمة">
          <span className="info-value">{sectorData.organization?.name}</span>
        </InfoRow>

        <InfoRow icon={HiOutlineUser} label="اسم رئيس المركز">
          <span className="info-value">
            {sectorData.manager_id || "غير محدد"}
          </span>
        </InfoRow>

        <InfoRow icon={HiOutlineStar} label="رئيس جودة وتشغيل">
          <span className="info-value">
            {sectorData.boss_name || "غير محدد"}
          </span>
        </InfoRow>

        <InfoRow icon={HiOutlineUserGroup} label="مشرف جودة وتشغيل">
          <span className="info-value">
            {sectorData.supervisor_name || "غير محدد"}
          </span>
        </InfoRow>

        <InfoRow icon={HiOutlineFlag} label="جنسية الحجاج">
          <NationalityDisplay
            nationality={sectorData.nationality}
            flagIcon={sectorData.flag_icon}
          />
        </InfoRow>

        <InfoRow icon={HiOutlineUsers} label="عدد الحجاج">
          <span className="info-value">
            {sectorData.guest_quantity?.toLocaleString() || "0"}
          </span>
        </InfoRow>

        <InfoRow icon={HiOutlineCollection} label="عدد المطابخ">
          <span className="info-value">
            {sectorData.kitchen_quantity || "0"}
          </span>
        </InfoRow>

        <InfoRow icon={HiOutlineHashtag} label="رقم الشاخص">
          <span className="info-value">{sectorData.sight || "غير محدد"}</span>
        </InfoRow>

        <InfoRow icon={HiOutlineEye} label="المراقبين" isMonitors>
          <MonitorBadges monitors={sectorData.monitors} />
        </InfoRow>
      </div>

      {/* Sight Photo */}
      {sectorData.sight_photo && (
        <div className="sight-section">
          <p className="sight-title">
            <HiOutlineCamera className="sight-icon" />
            شاخص منى
          </p>
          <div className="sight-photo-container">
            <Image
              src={sectorData.sight_photo}
              width={280}
              height={200}
              alt="sight photo"
              className="sight-photo"
            />
          </div>
        </div>
      )}

      {/* Location Buttons */}
      <LocationButtons sectorData={sectorData} onNavigation={onNavigation} />

      <style jsx>{`
        .sector-content {
          padding: 0;
        }

        .sector-header {
          text-align: center;
          background: white;
        }

        .logo-container {
          margin-bottom: 12px;
        }

        .organization-logo {
          border-radius: 15px;
          /* border: 1px solid #e0e0e0; */
          background: white;
          padding: 4px;
        }

        .sector-title-bar {
          border-radius: 6px;
          padding: 12px;
          margin-top: 8px;
        }

        .sector-title {
          color: white;
          font-size: 16px;
          font-weight: bold;
          margin: 0;
          text-align: center;
        }

        .info-list {
          padding: 16px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
          font-size: 14px;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .monitors-row {
          align-items: flex-start;
        }

        .info-label {
          color: #c9b171;
          font-weight: 500;
          min-width: 120px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .label-icon {
          font-size: 16px;
          color: #c9b171;
          flex-shrink: 0;
        }

        .info-value {
          color: #333;
          font-weight: 500;
          text-align: left;
        }

        .nationality-value {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .flag-icon {
          border-radius: 2px;
        }

        .monitors-container {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          justify-content: flex-end;
          max-width: 180px;
        }

        .monitor-badge {
          background: #c9b171;
          color: white;
          padding: 2px 8px 3px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }

        .sight-section {
          padding: 16px;
          text-align: center;
          border-top: 1px solid #f0f0f0;
        }

        .sight-title {
          color: #c9b171;
          font-size: 14px;
          font-weight: bold;
          margin: 0 0 12px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .sight-icon {
          font-size: 16px;
          color: #c9b171;
        }

        .sight-photo-container {
          display: flex;
          justify-content: center;
        }

        .sight-photo {
          border-radius: 8px;
          border: 1px solid #c9b171;
          max-width: 100%;
          height: auto;
        }

        .location-buttons {
          display: flex;
          gap: 8px;
          padding: 16px;
          background: #f8f8f8;
        }

        .location-btn {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          color: white;
        }

        .mena-btn {
          background: #c9b171;
        }

        .arafah-btn {
          background: #6b8e6b;
        }

        .location-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .location-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          opacity: 0.6;
        }
      `}</style>
    </div>
  )
}

export default SectorInfo
