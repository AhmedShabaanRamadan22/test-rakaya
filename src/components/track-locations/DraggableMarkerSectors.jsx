import "leaflet/dist/leaflet.css"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { Marker, Popup, useMap } from "react-leaflet"
import SpinnerLoading from "../SpinnerLoading"
import { useFormikContext } from "formik"
import Button from "../Button"
import { useRouter } from "next/router"
import { FaMapMarkerAlt, FaMountain } from "react-icons/fa"
function DraggableMarkerSectors({
  position,
  setPosition,
  DetailsSectorData,
  setIdSector,
  id,
  icon,
  LoadingSector,
}) {
  const [draggable, setDraggable] = useState(false)
  const markerRef = useRef(null)
  const map = useMap()
  const router = useRouter()
  const { values } = useFormikContext()

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
      popupopen() {
        setIdSector(id)
      },
    }),
    [setPosition, id, setIdSector]
  )

  // useEffect(() => {
  //   map.setView(position, 13);
  // }, [values?.organization_id]);
  const handleNavigation = (url) => {
    if (url && typeof url === "string" && url.trim() !== "") {
      if (url.startsWith("http")) {
        window.open(url, "_blank")
      } else {
        router.push(url)
      }
    } else {
      console.error("Invalid URL:", url)
      alert("الموقع غير متاح حاليًا")
    }
  }
  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={icon}
    >
      <Popup minWidth={200}>
        {LoadingSector ? (
          <div className="d-flex  align-items-center justify-content-center">
            <SpinnerLoading />
          </div>
        ) : (
          <div className="">
            <div className="d-flex justify-content-center">
              <Image
                src={DetailsSectorData?.data?.sector?.organization?.logo || ""}
                width={0}
                height={80}
                alt="sight_photo"
                className="rounded-5 p-1"
                style={{
                  // border: "1px solid #C9B171",
                  // objectFit: "cover",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              className="d-flex align-items-center justify-content-center text-center gap-2  mt-2 rounded-3"
              style={{
                backgroundColor:
                  DetailsSectorData?.data?.sector?.organization?.primary_color,
              }}
            >
              <p className="fw-bolder fs-6 p-2  " style={{ color: "#fff" }}>
                {DetailsSectorData?.data?.sector?.label} -{" "}
                {DetailsSectorData?.data?.sector?.facility_name}
              </p>
            </div>
            <div
              className="d-flex flex-column items-center w-100  mainScroll"
              style={{ maxHeight: "300px", overflowY: "scroll" }}
            >
              <div className="d-flex align-items-center gap-2 mt-2">
                <p className="" style={{ color: "#C9B171" }}>
                  المنظمة:
                </p>

                <p className="">
                  {DetailsSectorData?.data?.sector?.organization?.name}
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mt-2">
                <p className="" style={{ color: "#C9B171" }}>
                  اسم رئيس المركز:
                </p>

                <p className="">
                  {DetailsSectorData?.data?.sector?.manager_id}
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mt-2">
                <p className="" style={{ color: "#C9B171" }}>
                  {" "}
                  رئيس جودة وتشغيل:
                </p>

                <p className="">{DetailsSectorData?.data?.sector?.boss_name}</p>
              </div>
              <div className="d-flex align-items-center gap-2 mt-2">
                <p className="" style={{ color: "#C9B171" }}>
                  مشرف جودة وتشغيل:
                </p>

                <p className="">
                  {DetailsSectorData?.data?.sector?.supervisor_name}
                </p>
              </div>

              <div className="d-flex align-items-center gap-2 mt-2">
                <p className="" style={{ color: "#C9B171" }}>
                  جنسية الحجاج:
                </p>

                <p className="">
                  {DetailsSectorData?.data?.sector?.nationality}
                  <span className="mx-2">
                    <Image
                      src={DetailsSectorData?.data?.sector?.flag_icon || ""}
                      alt=""
                      width={15}
                      height={15}
                    />
                  </span>
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mt-2">
                <p className="" style={{ color: "#C9B171" }}>
                  عدد الحجاج:
                </p>

                <p className="">
                  {DetailsSectorData?.data?.sector?.guest_quantity}
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mt-2">
                <p className="" style={{ color: "#C9B171" }}>
                  عدد المطابخ:
                </p>

                <p className="">
                  {DetailsSectorData?.data?.sector?.kitchen_quantity}
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mt-2">
                <p className="" style={{ color: "#C9B171" }}>
                  رقم الشاخص:
                </p>

                <p className="">{DetailsSectorData?.data?.sector?.sight}</p>
              </div>
              <div className="d-flex  gap-2 mt-2">
                <p className="" style={{ color: "#C9B171" }}>
                  المراقبين:
                </p>

                <div
                  className="d-flex "
                  style={{ flexWrap: "Wrap", gap: "5px" }}
                >
                  {DetailsSectorData?.data?.sector?.monitors.length
                    ? DetailsSectorData?.data?.sector?.monitors?.map((item) => (
                        <p
                          key={item?.id}
                          className="badge mx-1"
                          style={{
                            margin: "0 1px",
                            backgroundColor: "#C9B171",
                          }}
                        >
                          {item?.name}
                        </p>
                      ))
                    : "لايوجد مراقبين"}
                </div>
              </div>

              {DetailsSectorData?.data?.sector?.sight_photo && (
                <div className="  gap-2 mt-2">
                  <p
                    className="d-flex align-items-center flex-column justify-content-center"
                    style={{ color: "#C9B171" }}
                  >
                    شاخص منى
                  </p>
                  <div className="d-flex justify-content-center mt-2">
                    <Image
                      src={DetailsSectorData?.data?.sector?.sight_photo || ""}
                      width={200}
                      height={200}
                      alt="sight_photo"
                      className="rounded-5 p-1"
                      style={{
                        border: "1px solid #C9B171",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="d-flex gap-2 mt-2">
                <Button
                  onClick={() =>
                    handleNavigation(DetailsSectorData?.data?.sector?.location)
                  }
                  disabled={!DetailsSectorData?.data?.sector?.location}
                >
                  {/* <FaMapMarkerAlt className="me-2" /> */}
                  موقع منى
                </Button>
                <Button
                  //   style={ {
                  //   padding:"0" 
                  // }}
                  onClick={() =>
                    handleNavigation(
                      DetailsSectorData?.data?.sector?.arafah_location
                    )
                  }
                  disabled={!DetailsSectorData?.data?.sector?.arafah_location}
                >
                  <div className="d-flex align-items-center gap-1">
                    {/* <FaMountain className="me-2 fs-" /> */}
                    <p>موقع عرفة</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </Marker>
  )
}

export default DraggableMarkerSectors
