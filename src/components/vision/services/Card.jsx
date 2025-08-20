import React, { useState } from "react";
import styles from "@/styles/vision.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";

import pattern from "assets/patterns/pattern1.svg";

const containerVariant = {
  visible: {
    backgroundColor: "#C9B171",
  },
};

const titleVariant = {
  visible: {
    y: "0%",
    transition: { type: "spring", damping: 20, stiffness: 120 },
  },
  hidden: {
    y: "-35%",
    transition: { type: "spring", damping: 20, stiffness: 120 },
  },
};

const descriptionVariant = {
  visible: {
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
  hidden: {
    opacity: 1,
    overflow: "auto",
    transition: { delay: 0.2 },
  },
};

const Pattern = ({ rotate = false }) => (
  <motion.div
    variants={{
      visible: { x: 0, transition: { duration: 0.5 } },
      hidden: { x: rotate ? "40%" : "-40%", transition: { duration: 0.5 } },
    }}
    className={`position-absolute d-flex m-2 ${
      rotate ? "bottom-0" : "top-0 justify-content-end"
    }`}
  >
    <Image
      alt="image"
      width={null}
      height={null}
      src={pattern}
      style={{
        rotate: rotate ? "180deg " : "0deg",
        zIndex: 10000,
        transform: "scaleX(-1)",
      }}
      className="img-fluid col-2"
    />
  </motion.div>
);

const Card = ({ title, children }) => {
  const [animateCard, setAnimateCard] = useState(false);
  return (
    <div className="col-md-4 my-3">
      <motion.div
        variants={containerVariant}
        initial="visible"
        whileHover="hidden"
        animate={animateCard ? "hidden" : "visible"}
        onTap={() => setAnimateCard(!animateCard)}
        className={`${styles["card"]}  rounded-4 position-relative d-flex flex-column justify-content-center overflow-hidden px-0`}
      >
        <Pattern rotate={false} />
        <Pattern rotate />
        <motion.div
          variants={titleVariant}
          className="d-flex justify-content-center align-items-center h-100 px-5 text-white position-absoulte"
        >
          <h4 className="text-center">{title}</h4>
        </motion.div>
        <motion.div
          variants={descriptionVariant}
          className={`d-flex flex-column text-center h-75 text-white bottom-0 px-2 gap-0 position-absolute ${styles["card-scroll"]}`}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Card;
