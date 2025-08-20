import useFetch from "@/hooks/useFetch"
import { useFormikContext } from "formik"
import React, { useEffect, useMemo } from "react"
import SelectComp from "./SelectComp"

function SelectBoss({
  label,
  required,
  labelClassName,
  icon,
  sectors_table,
}) {
  const { values, setFieldValue } = useFormikContext()
  const organization_id = values?.organization_id

  const nationalitiesOptions = useMemo(() => {
    if (!sectors_table?.length) return []

    const filteredSectors = organization_id
      ? sectors_table.filter((item) => item?.organization_id == organization_id)
      : sectors_table

    const uniqueNationalities = [
      ...new Set(
        filteredSectors
          .map((item) => item?.boss)
          .filter((nationality) => nationality && nationality.trim() !== "")
      ),
    ]

    const sortedNationalities = uniqueNationalities.sort((a, b) =>
      a.localeCompare(b, "ar", { numeric: true })
    )

    return sortedNationalities.map((nationality) => ({
      value: nationality,
      label: nationality,
    }))
  }, [sectors_table, organization_id])

  const selectedValue = useMemo(() => {
    const currentNationality = values.boss_id
    return nationalitiesOptions.find(
      (option) => option.value === currentNationality
    )
  }, [nationalitiesOptions, values.boss_id])

  useEffect(() => {
    if (organization_id && values.boss_id) {
      const isNationalityStillValid = nationalitiesOptions.some(
        (option) => option.value === values.boss_id
      )

      if (!isNationalityStillValid) {
        setFieldValue("boss_id", "")
      }
    }
  }, [
    organization_id,
    nationalitiesOptions,
    values.boss_id,
    setFieldValue,
  ])

  return (
    <div>
      <SelectComp
        icon={icon}
        label={label}
        labelClassName={labelClassName}
        name="boss_id"
        options={nationalitiesOptions}
        placeholder="اختر قائد الفريق"
        required={required}
        isClearable
        selectedValue={selectedValue}
        isSearchable 
        noOptionsMessage={() => "لا توجد جنسيات متاحة"}
        loadingMessage={() => "جاري التحميل..."}
      />

 
    </div>
  )
}

export default SelectBoss
