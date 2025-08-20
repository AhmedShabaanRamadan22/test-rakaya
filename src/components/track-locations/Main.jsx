import useFetch from "@/hooks/useFetch"
import usePusher from "@/hooks/usePusher"
import { useFormikContext } from "formik"
import dynamic from "next/dynamic"
import React, { useEffect, useState, useCallback, useMemo, useRef } from "react"
import { debounce } from "lodash"
import SideItem from "./SideItem"
import SpinnerLoading from "../SpinnerLoading"

const MainMap = dynamic(
  () => import("@/components/track-locations/Map/MainMap"),
  {
    ssr: false,
  }
)

export const initialCenter = {
  lat: 21.410453961653573,
  lng: 39.89736663051703,
}

function Main({ isDarkMode, collapsed }) {
  const { values, setFieldValue } = useFormikContext()
  const [resetMap, setResetMap] = useState(initialCenter)
  const [allData, setAllData] = useState({})
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  const [updateTimestamp, setUpdateTimestamp] = useState(Date.now())

  const lastModelNameRef = useRef(null)
  const currentModelRef = useRef(null)
  const [isModelUpdate, setIsModelUpdate] = useState(false)

  const queryParams = useMemo(() => {
    return {
      monitor_id: values?.monitor_id || "",
      date: values?.date || "",
      sector_id: values?.sector_id || "",
      organization_id: values?.organization_id || "",
      model: values?.modelName || "",
      _t: updateTimestamp,
    }
  }, [values, updateTimestamp])

  const endpoint = useMemo(() => {
    const searchParams = new URLSearchParams()
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value)
      }
    })
    return `refada-statistics?${searchParams.toString()}`
  }, [queryParams])

  const {
    data: mainDataLocation,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useFetch({
    endpoint: endpoint,
    queryKey: [endpoint],
    refetchOnMount: true,
    staleTime: 0,
  })

  const filteredData = useMemo(() => {
    if (!allData || Object.keys(allData).length === 0) {
      return allData
    }

    const hasNationalityFilter = !!values.nationality_id
    const hasBossFilter = !!values.boss_id
    const hasSupervisorFilter = !!values.supervisor_id

    if (!hasNationalityFilter && !hasBossFilter && !hasSupervisorFilter) {
      return allData
    }

    const filtered = {}

    Object.keys(allData).forEach((key) => {
      filtered[key] = allData[key]
    })

    if (filtered.sectors_table && Array.isArray(filtered.sectors_table)) {
      filtered.sectors_table = filtered.sectors_table.filter((sector) => {
        let matchesFilters = true

        if (hasNationalityFilter) {
          matchesFilters =
            matchesFilters && sector.nationality === values.nationality_id
        }

        if (hasBossFilter) {
          matchesFilters = matchesFilters && sector.boss === values.boss_id
        }

        if (hasSupervisorFilter) {
          matchesFilters =
            matchesFilters && sector.supervisor === values.supervisor_id
        }

        return matchesFilters
      })
    }

    Object.keys(filtered).forEach((key) => {
      if (
        Array.isArray(filtered[key]) &&
        key !== "sectors_table" &&
        key !== "locations"
      ) {
        const originalArray = filtered[key]

        filtered[key] = originalArray.filter((item) => {
          if (item && typeof item === "object") {
            let matchesFilters = true

            if (hasNationalityFilter && "nationality" in item) {
              matchesFilters =
                matchesFilters && item.nationality === values.nationality_id
            }

            // فلتر الرئيس
            if (hasBossFilter && "boss_id" in item) {
              matchesFilters = matchesFilters && item.boss === values.boss_id
            }

            // فلتر المشرف
            if (hasSupervisorFilter && "supervisor_id" in item) {
              matchesFilters =
                matchesFilters && item.supervisor === values.supervisor_id
            }

            return matchesFilters
          }
          return true
        })
      }
    })

    return filtered
  }, [allData, values.nationality_id, values.boss_id, values.supervisor_id])

  const debouncedRefetch = useCallback(() => {
    const debouncedFunction = debounce(() => {
      if (values.organization_id) {
        refetch()
      }
    }, 500)
    return debouncedFunction()
  }, [refetch, values.organization_id])

  const smartMergeData = useCallback(
    (previousData, newData, modelName) => {
      if (!modelName || !isModelUpdate) {
        return newData
      }

      const mergedData = { ...previousData }

      if (newData[modelName]) {
        mergedData[modelName] = newData[modelName]
        return mergedData
      }

      if (Object.keys(newData).length === 1) {
        const dataKey = Object.keys(newData)[0]
        mergedData[modelName] = newData[dataKey]
        return mergedData
      }

      for (const key in newData) {
        if (key.includes(modelName) || key === modelName) {
          mergedData[key] = newData[key]
        }
      }

      return mergedData
    },
    [isModelUpdate]
  )

  const handlePusherEvent = useCallback(
    (data) => {
      console.log("🚀 ~ Main ~ data:", data)
      if (!data?.model_name) {
        console.error("Pusher event missing model_name:", data)
        return
      }

      setIsUpdating(true)
      setIsModelUpdate(true)
      currentModelRef.current = data.model_name
      setFieldValue("modelName", data.model_name)

      if (lastModelNameRef?.current === data?.model_name) {
        setUpdateTimestamp(Date.now())
      }

      lastModelNameRef.current = data.model_name
      debouncedRefetch()
    },
    [setFieldValue, debouncedRefetch]
  )

  const eventsToListen = useMemo(
    () => ({
      "Ticket-changes": handlePusherEvent,
      "Order-changes": handlePusherEvent,
      "Support-changes": handlePusherEvent,
      "Meal-changes": handlePusherEvent,
    }),
    [handlePusherEvent]
  )

  usePusher(eventsToListen)

  useEffect(() => {
    if (isError) {
      console.error("Error fetching data:", error)
      setIsUpdating(false)
      setIsInitialLoading(false)
    } else if (isSuccess) {
      if (mainDataLocation?.data) {
        setAllData((prevData) =>
          smartMergeData(
            prevData,
            mainDataLocation.data,
            currentModelRef.current
          )
        )
      }
      setIsInitialLoading(false)
      setIsUpdating(false)
    }
  }, [isSuccess, isError, error, mainDataLocation, smartMergeData])

  useEffect(() => {
    if (values.organization_id) {
      if (!values.modelName) {
        setIsModelUpdate(false)
      }
      debouncedRefetch()
    }
  }, [
    values.monitor_id,
    values.date,
    values.sector_id,
    values.organization_id,
    values.modelName,
    debouncedRefetch,
    updateTimestamp,
  ])

  useEffect(() => {
    const type = localStorage.getItem("type")
    if (type === "ithraa") {
      setFieldValue("organization_id", 2)
    } else if (type === "novotel") {
      setFieldValue("organization_id", 5)
    } else if (type === "rawafMina") {
      setFieldValue("organization_id", 6)
    } else if (type === "Makkah") {
      setFieldValue("organization_id", 7)
    } else if (type === "ithraaAljoud") {
      setFieldValue("organization_id", 8)
    }
  }, [setFieldValue])

  const filterStats = useMemo(() => {
    const originalSectorsCount = allData.sectors_table?.length || 0
    const filteredSectorsCount = filteredData.sectors_table?.length || 0

    // تحديد الفلاتر النشطة
    const activeFilters = []
    if (values.nationality_id)
      activeFilters.push(`الجنسية: ${values.nationality_id}`)
    if (values.boss_id) activeFilters.push(`الرئيس: ${values.boss_id}`)
    if (values.supervisor_id)
      activeFilters.push(`المشرف: ${values.supervisor_id}`)

    return {
      originalCount: originalSectorsCount,
      filteredCount: filteredSectorsCount,
      isFiltered: activeFilters.length > 0,
      activeFilters: activeFilters,
      filterText: activeFilters.join(" | "),
    }
  }, [
    allData,
    filteredData,
    values.nationality_id,
    values.boss_id,
    values.supervisor_id,
  ])

  return (
    <>
      <div
        className={
          collapsed && !isLoading
            ? "main-sidebar-track-mobile"
            : "main-sidebar-track"
        }
      >
        <SideItem
          setResetMap={setResetMap}
          resetMap={resetMap}
          isDarkMode={isDarkMode}
          mainDataLocation={filteredData}
          isLoading={isInitialLoading}
        />
      </div>
      <div
        className={collapsed ? "" : "mainMap"}
        style={{ position: "relative" }}
      >
        {isInitialLoading ? (
          <div
            className={`d-flex align-items-center justify-content-center`}
            style={{
              height: "100vh",
              backgroundColor: isLoading && isDarkMode ? "#2c3639" : "",
              color: isLoading && isDarkMode ? "white" : "",
            }}
          >
            <SpinnerLoading />
          </div>
        ) : (
          <>
            {(isUpdating || isLoading) && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  zIndex: 1000,
                }}
              >
                جاري التحديث...
              </div>
            )}

            {filterStats.isFiltered && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "rgba(25, 135, 84, 0.9)",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  zIndex: 1000,
                  fontSize: "14px",
                  fontFamily: "Tajawal, Arial, sans-serif",
                  direction: "rtl",
                  minWidth: "200px",
                  maxWidth: "350px",
                }}
              >
                🔍 <strong>مفلتر حسب:</strong>
                <br />
                {filterStats.filterText}
                <br />
                📊 <strong>النتائج:</strong> {filterStats.filteredCount} من{" "}
                {filterStats.originalCount} قطاع
                <br />
                {filterStats.filteredCount === 0 && (
                  <span style={{ color: "#ffeb3b" }}>
                    ⚠️ لا توجد نتائج تطابق الفلاتر المحددة
                  </span>
                )}
              </div>
            )}

            {Object?.keys(filteredData)?.length > 0 ? (
              <MainMap
                isDarkMode={isDarkMode}
                resetMap={resetMap}
                mainDataLocation={filteredData}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <div
                  style={{
                    textAlign: "center",
                    direction: "rtl",
                    fontFamily: "Tajawal, Arial, sans-serif",
                  }}
                >
                  <p>لا توجد بيانات متاحة للعرض.</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Main
