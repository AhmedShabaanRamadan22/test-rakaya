import useFetch from "@/hooks/useFetch"
import { useFormikContext } from "formik"
import React, { useEffect, useState } from "react"
import SelectComp from "./SelectComp"

function SelectOrganization({ label, required, labelClassName, icon }) {
  const { values, setFieldValue } = useFormikContext()
  const { data } = useFetch({
    endpoint: `organizations`,
    queryKey: [`organizations`],
  })

  const [isDisabled, setIsDisabled] = useState(false)
  const GetOrganizationByIds = [2, 5, 6, 7, 8]


  const options = data?.data?.organizations
    ?.filter((item) => GetOrganizationByIds.includes(item.id))
    ?.map((item) => ({
      value: item.id,
      label: item.name,
    }))

  const selectedValue = options?.find(
    (option) => option?.value == values.organization_id
  )

  useEffect(() => {
    const type = localStorage.getItem("type")
    // if (type == "ithraa") {
    //   setFieldValue("organization_id", 2)
    //   setIsDisabled(true)
    // } else if (type == "albeit") {
    //   setFieldValue("organization_id", 1)
    //   setIsDisabled(true)
    // }
    if (type === "ithraa") {
      setFieldValue( "organization_id", 2 )
      setIsDisabled(true)
    } else if (type === "novotel") {
      setFieldValue( "organization_id", 5 )
      setIsDisabled(true)
    } else if (type === "rawafMina") {
      setFieldValue( "organization_id", 6 )
      setIsDisabled(true)
    } else if (type === "Makkah") {
      setFieldValue("organization_id", 7)
      setIsDisabled(true)
    } else if (type === "ithraaAljoud") {
      setFieldValue( "organization_id", 8 )
      setIsDisabled(true)
    }
  }, [setFieldValue])

  return (
    <div>
      <SelectComp
        label={label}
        labelClassName={labelClassName}
        name={"organization_id"}
        placeholder={"اختر المنظمة"}
        options={options}
        required={required}
        selectedValue={selectedValue}
        disabled={isDisabled}
        icon={icon}
        isClearable
      />
    </div>
  )
}

export default SelectOrganization
