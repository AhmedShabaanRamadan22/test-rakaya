import { format } from "date-fns";
import { useFormikContext } from "formik";
import { toHijri } from "hijri-converter";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import Label from "./Label";

export default function DatePickerComp({ name, name_hj, label, required , labelClassName , icon }) {
  const { setFieldValue, values, touched, errors, handleBlur } =
    useFormikContext();
  const [valueHijri, setValueHijri] = useState(values[name_hj]);
  const [date, setDate] = useState(
    values[name] ? new Date(values[name]) : null
  );
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  useEffect(() => {
    if (date) {
      const hijri = toHijri(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );
      const formattedHijriDate = `${hijri.hy}-${hijri.hm
        .toString()
        .padStart(2, "0")}-${hijri.hd.toString().padStart(2, "0")}`;
      setFieldValue(name_hj, formattedHijriDate);
      setValueHijri(formattedHijriDate);
    }
  }, [date, setFieldValue, name_hj]);

  const years = Array.from(
    { length: 2070 - 1940 + 1 },
    (_, index) => 1940 + index
  );
  const months = [
    t("common:June"),
    t("common:February"),
    t("common:March"),
    t("common:April"),
    t("common:May"),
    t("common:Jun"),
    t("common:July"),
    t("common:August"),
    t("common:September"),
    t("common:October"),
    t("common:November"),
    t("common:December"),
  ];
  const daysOfWeek = [
    t("common:Sun"),
    t("common:Mon"),
    t("common:Tue"),
    t("common:Wed"),
    t("common:Thu"),
    t("common:Fri"),
    t("common:Sat"),
  ];

  const currentLanguage = i18n.language;
  const renderDaysOfWeek = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "3px",
        }}
      >
        {daysOfWeek.map((day) => (
          <span className="date_picker_day" key={day}>
            {day}
          </span>
        ))}
      </div>
    );
  };
  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <>
      <div
        style={{ margin: 10, display: "flex", justifyContent: "space-evenly" }}
      >
        <select
          className="p-1 border border-[#cccccc] rounded-md "
          value={date.getFullYear()}
          onChange={({ target: { value } }) => changeYear(value)}
        >
          {years.map((option) => (
            <option
              key={option}
              value={option}
              className="text-black dark:text-white dark:bg-darkModeColor"
            >
              {option}
            </option>
          ))}
        </select>

        <select
          className="p-1 border border-[#cccccc] rounded-md"
          value={months[date.getMonth()]}
          onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
          }
        >
          {months.map((option) => (
            <option
              key={option}
              value={option}
              className="text-black dark:text-white dark:bg-darkModeColor"
            >
              {option}
            </option>
          ))}
        </select>

        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
        ></button>
      </div>
      {renderDaysOfWeek(currentLanguage)}
    </>
  );
  const handleDateChange = (newValue) => {
    if (!newValue) {
      setFieldValue(name, "");
      setFieldValue(name_hj, "");
      setDate(null);
    } else {
      const newDate = new Date(newValue);
      if (!isNaN(newDate)) {
        const formattedDate = format(newDate, "yyyy-MM-dd");
        setFieldValue(name, formattedDate);
        setFieldValue(name_hj, valueHijri);
        setDate(newDate);
      } else {
        console.error("Invalid date");
      }
    }
  };
  return (
    <>
      <div className="">
        <Label className={labelClassName}>
          {icon}
          {label}
          <span className="text-danger mx-1">{required == "1" ? "*" : ""}</span>
        </Label>
        <div className="w-full">
          <DatePicker
            selected={date}
            name={name}
            onBlur={(e) => {
              handleBlur(e)
            }}
            placeholderText="MM/DD/YYYY"
            renderCustomHeader={CustomHeader}
            className={`form-control p-2 ${
              errors[name] && touched[name] ? "border-danger" : ""
            }`}
            onChange={handleDateChange}
          />
        </div>
        {touched[name] && errors[name] && (
          <div className="text-danger" style={{ fontSize: "12px" }}>
            {errors[name]}
          </div>
        )}
      </div>
    </>
  )
}