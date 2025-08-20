import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import SpinnerLoading from "../SpinnerLoading";
import { extractTimeWithAmPm } from "@/utils/Helpers";
import { useFormikContext } from "formik";
import Link from "next/link";

function DraggableMarker({
  position,
  setPosition,
  mentor,
  setIdMentor,
  id,
  icon,
  LoadingMentor,
  resetMap,
  disablePopup,
}) {
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef(null);
  const map = useMap();
  const { values } = useFormikContext();

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
      popupopen() {
        setIdMentor(id);
      },
    }),
    [setPosition, id, setIdMentor]
  );

  useEffect(() => {
    if (resetMap) {
      map.setView(resetMap, 13);
    }
  }, [resetMap, map]);

  // useEffect(() => {
  //   map.setView(position, 13);
  // }, [values?.monitor_id]);

  useEffect(() => {
    map.setView(position, 13);
  }, [resetMap]);
  
  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={icon}
    >
      {!disablePopup && (
        <Popup minWidth={200}>
          {LoadingMentor ? (
            <div className="d-flex  align-items-center justify-content-center">
              <SpinnerLoading />
            </div>
          ) : (
            <div className="d-flex flex-column items-center w-100" dir="">
              <div className="d-flex align-items-center gap-2 ">
                <Image
                  src={
                    mentor?.data?.location?.user_info?.profile_photo ||
                    "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png"
                  }
                  alt="logo"
                  width={50}
                  height={50}
                  loading="lazy"
                  className="rounded-5 p-1"
                  style={{ border: "1px solid #C9B171", objectFit: "cover" }}
                />
                <p
                  className="!m-0 text-[16px]"
                  style={{ color: "rgb(201, 177, 113)" }}
                >
                  {mentor?.data?.location?.user_info?.name}
                </p>
              </div>

              <div className="d-flex align-items-center gap-2 mt-2">
                <p className="" style={{ color: "#C9B171" }}>
                  نوع الهاتف:
                </p>
                <p className="">{mentor?.data?.location?.device}</p>
              </div>
              <div className="d-flex align-items-center gap-2 mt-2">
                <p className="" style={{ color: "#C9B171" }}>
                  رقم الهاتف:
                </p>
                <Link
                  href={`tel:${mentor?.data?.location?.user_info?.phone}`}
                  className=""
                  style={{ color: "#000" }}
                >
                  {mentor?.data?.location?.user_info?.phone}
                </Link>
              </div>
              <div className="d-flex align-items-center gap-2 mt-1">
                <p className="" style={{ color: "#C9B171" }}>
                  {" "}
                  تاريخ العملية :
                </p>
                <p className="">
                  {mentor?.data?.location?.action_time.slice(0, 10)}
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mt-1">
                <p className="" style={{ color: "#C9B171" }}>
                  {" "}
                  وقت العملية :
                </p>
                <p className="">
                  {extractTimeWithAmPm(mentor?.data?.location?.action_time)}
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mt-1">
                <p className="" style={{ color: "#C9B171" }}>
                  {" "}
                  الحدث :
                </p>
                <p>{mentor?.data?.location?.action}</p>
              </div>
            </div>
          )}
        </Popup>
      )}
    </Marker>
  );
}

export default DraggableMarker;
