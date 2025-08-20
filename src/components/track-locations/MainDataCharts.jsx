import React from "react"
import { FaPersonShelter, FaTents } from "react-icons/fa6"
import { IoMdPerson } from "react-icons/io"
import NationalityChart from "./NationalityChart"
import TicketsChart from "./TicketsChart"
import TicketDangerChart from "./TicketDangerChart"
import TicketsChartStatus from "./TicketsChartStatus"
import LineChart from "./LineChart"
import MealsChartByStatus from "./MealsChartByStatus"
import MealsChartByDay from "./MealsChartByDay"
import TableSectors from "./TableSectors"
import TableMentor from "./tableMentor"
import StatisticItem from "./StatisticItem"
import LineChartWaterQuantity from "./LineChartWaterQuantity"

function MainDataCharts({
  numberOfSectors,
  numberOfMentors,
  numberOfPilgrims,
  numberOfPilgrimsNationality,
  tickets_by_danger,
  tickets_by_status,
  supports_food_by_day,
  supports_water_by_day,
  meals_by_status,
  meals_by_day,
  sectors_table,
  monitors_table,
  tickets_by_reason,
  isDarkMode,
  supports_water_by_day_quantity,
}) {
  return (
    <>
      <div className="px-3 pb-4 mt-4">
        <h5 style={{ color: "#C9B171" }}>الاحصائيات العامة</h5>
        <div className="row row-cols-3 mt-3">
          <StatisticItem
            icon={<FaTents className="fs-3" />}
            count={numberOfSectors?.toString()}
            label="عدد المراكز"
          />
          <StatisticItem
            icon={<FaPersonShelter className="fs-3" />}
            count={numberOfMentors?.toString()}
            label="عدد المراقبين"
          />
          <StatisticItem
            icon={<IoMdPerson className="fs-3" />}
            count={numberOfPilgrims?.toString()}
            label="عدد الحجاج"
          />
        </div>
      </div>
      <hr className="m-0" />
      <div
        className="filter-container pt-4"
        style={{ height: "calc(100vh - 380px)", overflowY: "scroll" }}
      >
        <div>
          <div className="mb-4">
            <div className="px-3">
              <h5 style={{ color: "#C9B171" }}>عدد الحجاج حسب الجنسيات</h5>
              <NationalityChart
                numberOfPilgrimsNationality={numberOfPilgrimsNationality}
              />
            </div>
          </div>

          <hr className="m-0" />
          <div className="my-4">
            <div className="px-3">
              <h5 style={{ color: "#C9B171" }}>البلاغات</h5>
              <div>
                <div className="mt-3">
                  <TicketsChart tickets_by_reason={tickets_by_reason} />
                </div>
                <div className="mt-3">
                  <TicketDangerChart
                    isDarkMode={isDarkMode}
                    tickets_by_danger={tickets_by_danger}
                  />
                </div>
                <div className="mt-3">
                  <TicketsChartStatus
                    isDarkMode={isDarkMode}
                    tickets_by_status={tickets_by_status}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="m-0" />

          <div className="my-4">
            <div className="px-3">
              <h5 style={{ color: "#C9B171" }}>طلبات الاسناد</h5>
              <LineChart
                isDarkMode={isDarkMode}
                supports_food_by_day={supports_food_by_day}
                supports_water_by_day={supports_water_by_day}
              />
              <LineChartWaterQuantity
                isDarkMode={isDarkMode}
                supports_water_by_day_quantity={supports_water_by_day_quantity}
              />
            </div>
          </div>
          <hr className="m-0" />

          <div className="my-4">
            <div className="px-3">
              <h5 style={{ color: "#C9B171" }}>الوجبات </h5>
              <MealsChartByStatus
                isDarkMode={isDarkMode}
                meals_by_status={meals_by_status}
              />
            </div>
            <div>
              <MealsChartByDay
                meals_by_day={meals_by_day}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
          <hr className="m-0" />
          <div className="my-4">
            <div className="px-3">
              <h5 style={{ color: "#C9B171" }}>بيانات مركز الخدمة</h5>
              <TableSectors sectors_table={sectors_table} />
            </div>
          </div>

          <hr className="m-0" />
          <div className="my-4">
            <div className="px-3">
              <h5 style={{ color: "#C9B171" }}>بيانات المراقبين</h5>
              <TableMentor monitors_table={monitors_table} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainDataCharts
