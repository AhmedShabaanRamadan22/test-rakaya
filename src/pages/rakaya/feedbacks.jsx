import CustomHead from "@/components/CustomHead";
import Header from "@/components/jobs/Header";
import VisionLayout from "@/components/vision/VisionLayout";
import { blogs } from "@/data";
import React from "react";
const impact = () => {
  const description = "قَبس .. اقتباسات نعُدها شعلة مضيئة تزيد من توهجنا"
  return (
    <>
      <CustomHead title={"قَبس عن ركايا"} description={description} />

      <Header text={"قَبس عن ركايا"} />

      <VisionLayout>
        <h1>قَبس</h1>
        <h5>اِقتباسات نعُدها شعلة مضيئة تزيد من توهّجنا</h5>
        <div className="mainBoxBLog my-5">
          {blogs.map((item, index) => (
            <div className="blogBox mt-5 " key={index}>
              <h5>{item?.blog}</h5>
              <p className="text-start mt-3 mb-0">{item?.author} </p>
            </div>
          ))}
        </div>
      </VisionLayout>
    </>
  );
};

export default impact;
