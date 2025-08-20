import { useFormikContext } from "formik"
import React, { useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { IoFilter, IoReload, IoLocation } from "react-icons/io5"
import DatePickerComp from "../form/DatePickerComp"
import Label from "../form/Label"
import SelectMonitors from "../form/SelectMonitors"
import SelectOrganization from "../form/SelectOrganization"
import SelectSector from "../form/SelectSector"
import SelectTypeActions from "../form/SelectTypeActions"
import { FaPersonShelter, FaTents, FaCrown, FaUserTie } from "react-icons/fa6"
import { SiGithubactions } from "react-icons/si"
import { CgOrganisation } from "react-icons/cg"
import { BsCalendar2Date } from "react-icons/bs"
import { PiMapPinSimpleAreaFill } from "react-icons/pi"
import FilterRadioInput from "./FilterRadioInput"
import SelectNationalitiesMap from "../form/SelectNationalitiesMap"
import { CiFlag1 } from "react-icons/ci"
import SelectBoss from "../form/SelectBoss"
import SelectSupervisor from "../form/SelectSupervisor"

function Filter({ setResetMap, mainDataLocation, resetMap }) {
  const monitors_table = mainDataLocation?.data?.monitors_table
  const sectors_table = mainDataLocation?.sectors_table
  const { values, setFieldValue } = useFormikContext()
  const [show, setShow] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    if (values.Actions == "actionMentors") {
      setFieldValue("locationHajj", "All")
    }
  }, [values.Actions, setFieldValue])

  const handleResetFilters = () => {
    setResetKey((prevKey) => prevKey + 1)
    setFieldValue("monitor_id", "")
    setFieldValue("date", "")
    setFieldValue("sector_id", "")
    setFieldValue("organization_id", "")
    setFieldValue("locationHajj", "All")
    setFieldValue("Actions", "AllActions")
    setFieldValue("type_actions", "")
  }

  const showFilter =
    values?.monitor_id ||
    values?.date ||
    values?.sector_id ||
    values?.organization_id ||
    values?.type_actions

  return (
    <div
      className="bg-white rounded-4 bg-dark"
      style={{
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.19), 0 3px 6px rgba(0, 0, 0, 0)",
        width: show ? "300px" : "80px",
        transition: "width 0.3s ease",
      }}
    >
      <div
        className="d-flex gap-1 align-items-center justify-content-between p-2"
        style={{ cursor: "pointer" }}
      >
        <div
          className={`d-flex gap-1 align-items-center ${
            show ? "justify-content-between" : "m-auto"
          }`}
          onClick={() => setShow(true)}
        >
          <IoFilter />
          <button className="bg-transparent text_Dark">فلترة</button>
        </div>
        {show && (
          <div className="fs-6" onClick={() => setShow(false)}>
            <IoMdClose />
          </div>
        )}
      </div>
      {show && (
        <div className="mt-3 mb-3">
          <div className="mx-2">
            {showFilter && (
              <div
                className="d-flex align-items-center gap-1 border justify-content-center p-1 rounded-2 m-auto mb-2 reloadMap"
                style={{ cursor: "pointer" }}
                onClick={handleResetFilters}
              >
                <IoReload
                  style={{ fontSize: "12px" }}
                  color="rgb(201, 177, 113)"
                />
                <p
                  className="p-0 m-0"
                  style={{
                    fontSize: "12px",
                    color: "rgb(201, 177, 113)",
                    fontWeight: "bold",
                  }}
                >
                  اعادة تعيين
                </p>
              </div>
            )}
            <div
              className="d-flex align-items-center gap-1 border justify-content-center p-1 rounded-2 m-auto mb-2 reloadMap"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setResetMap({
                  lat: 21.42251,
                  lng: 39.826168,
                })
              }
            >
              <IoReload
                style={{ fontSize: "12px" }}
                color="rgb(201, 177, 113)"
              />
              <p
                className="p-0 m-0"
                style={{
                  fontSize: "12px",
                  color: "rgb(201, 177, 113)",
                  fontWeight: "bold",
                }}
              >
                تحديث الخريطة
              </p>
            </div>
          </div>
          <div
            className="filter-container"
            style={{
              height: "388px",
              padding: "0 10px 0 10px",
              overflowY: "scroll",
            }}
          >
            <div>
              <Label className={"label_track d-flex align-items-center gap-2"}>
                <PiMapPinSimpleAreaFill className="fs-5" />
                اختر نوع البيانات
              </Label>
              <div className="d-flex justify-content-between gap-2">
                <FilterRadioInput
                  name="Actions"
                  id="AllActions"
                  label="الكل"
                  defaultChecked
                  onChange={() => setFieldValue("Actions", "AllActions")}
                />
                <FilterRadioInput
                  name="Actions"
                  id="Sectors"
                  label="المراكز"
                  onChange={() => setFieldValue("Actions", "Sectors")}
                />
                <FilterRadioInput
                  name="Actions"
                  id="actionMentors"
                  label="العمليات التشغيلية"
                  onChange={() => setFieldValue("Actions", "actionMentors")}
                  labelClassName={"w-100"}
                />
              </div>
              {values.Actions !== "actionMentors" && (
                <>
                  <Label
                    className={"label_track d-flex align-items-center gap-2"}
                  >
                    <IoLocation className="fs-5" />
                    اختر موقع المشاعر
                  </Label>
                  <div className="d-flex justify-content-between gap-2">
                    <FilterRadioInput
                      name="locationHajj"
                      id="All"
                      label="الكل"
                      defaultChecked
                      mainDivClass={"w-100"}
                      onChange={() => setFieldValue("locationHajj", "All")}
                      labelClassName={"w-100"}
                    />
                    <FilterRadioInput
                      name="locationHajj"
                      id="Arfa"
                      label="عرفة"
                      onChange={() => setFieldValue("locationHajj", "Arfa")}
                      disabled={values?.Actions === "actionMentors"}
                      labelClassName={"w-100"}
                      mainDivClass={"w-100"}
                      disabledClass={
                        values?.Actions === "actionMentors"
                          ? "disabled-label"
                          : ""
                      }
                    />
                    <FilterRadioInput
                      name="locationHajj"
                      id="Mena"
                      label="منى"
                      onChange={() => setFieldValue("locationHajj", "Mena")}
                      disabled={values?.Actions === "actionMentors"}
                      labelClassName={"w-100"}
                      mainDivClass={"w-100"}
                      disabledClass={
                        values?.Actions === "actionMentors"
                          ? "disabled-label"
                          : ""
                      }
                    />
                  </div>
                </>
              )}
            </div>
            <div>
              <SelectTypeActions
                key={`organization-${resetKey}`}
                label={"اختر نوع الحدث"}
                labelClassName={"label_track d-flex align-items-center gap-2"}
                icon={<SiGithubactions className="fs-5" />}
              />
            </div>
            <div>
              <SelectOrganization
                key={`organization-${resetKey}`}
                label={"اختر المنظمة"}
                labelClassName={"label_track d-flex align-items-center gap-2"}
                icon={<CgOrganisation className="fs-5" />}
              />
            </div>
            <div className="w-100">
              <SelectSector
                key={`sector-${resetKey}`}
                label={"اختر مركز الخدمة"}
                labelClassName={"label_track d-flex align-items-center gap-2"}
                sectors_table={sectors_table}
                icon={<FaTents className="fs-5" />}
              />
            </div>
            <div className="w-100">
              <SelectNationalitiesMap
                key={`sector-${resetKey}`}
                label={"اختر  الجنسية"}
                labelClassName={"label_track d-flex align-items-center gap-2"}
                sectors_table={sectors_table}
                icon={<CiFlag1 className="fs-5" />}
              />
            </div>
            <div className="w-100">
              <SelectBoss
                key={`sector-${resetKey}`}
                label={"اختر  قائد الفريق"}
                labelClassName={"label_track d-flex align-items-center gap-2"}
                sectors_table={sectors_table}
                icon={<FaCrown className="fs-5" />}
              />
            </div>
            <div className="w-100">
              <SelectSupervisor
                key={`sector-${resetKey}`}
                label={"اختر  مشرف الفريق"}
                labelClassName={"label_track d-flex align-items-center gap-2"}
                sectors_table={sectors_table}
                icon={<FaUserTie className="fs-5" />}
              />
            </div>
            <div>
              <SelectMonitors
                key={`monitors-${resetKey}`}
                label={"اختر المراقب"}
                labelClassName={"label_track d-flex align-items-center gap-2"}
                monitors_table={monitors_table}
                icon={<FaPersonShelter className="fs-5" />}
              />
            </div>
            <div className="mb-3">
              <DatePickerComp
                key={`date-${resetKey}`}
                label={"التاريخ"}
                name={"date"}
                labelClassName={"label_track d-flex align-items-center gap-2"}
                icon={<BsCalendar2Date className="fs-5" />}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filter
