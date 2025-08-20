import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import Container from "../Container";
import { DarkModeContext } from "@/context/DarkModeContext";
import { t } from "i18next";
let currentCount = 0;

const StyledHeader = styled.h1`
  font-size: 3rem;
  font-weight: 700 !important;
`;
const Counter = ({ count }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const maxCount = parseInt(count.replace(/\D/g, ""), 10);

    const increment = maxCount / 100;

    const intervalId = setInterval(() => {
      currentCount += increment;
      if (currentCount < maxCount) {
        setDisplayCount(Math.floor(currentCount));
      } else {
        clearInterval(intervalId);
        setDisplayCount(maxCount);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <motion.div initial={0} animate={displayCount}>
      +{displayCount.toLocaleString()}
    </motion.div>
  );
};
const Stat = ({ count, text }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <Container className={"col-6 col-md-3 text-center "}>
      <StyledHeader className={` ${isDarkMode ? "text-gold" :"text-secondary"}  fw-bold my-0 headingNumber  `}>
        <Counter count={`${count}`} />
      </StyledHeader>
      <p className="fs-6 text-primary fw-semibold text_Dark">{t(`common:${text}`)}</p>
    </Container>
  );
};

const Stats = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`bg-forth ${isDarkMode ? "bg-dark" : ""}`}
      style={{
        boxShadow:
          isDarkMode &&
          "rgba(0, 0, 0, 0.19) 0px 0px 45px -14px, rgba(0, 0, 0, 0) 0px 3px 6px",
      }}
    >
      <div
        className={"row d-flex  justify-content-center m-auto py-5 my-5 w-100 "}
      >
        <Stat count={"+3,000,000"} text={"Meal"} />
        <Stat count={"+800"} text={"interested"} />
        <Stat count={"+10"} text={"Success_partner"} />
        <Stat count={"+32"} text={"employee"} />
      </div>
    </div>
  );
};

export default Stats;
