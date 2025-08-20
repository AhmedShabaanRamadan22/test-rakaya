import { useFormikContext } from "formik";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Counter = ({ count }) => {
  const [displayCount, setDisplayCount] = useState(0);
  const {values} = useFormikContext()
  let currentCount = 0;
  useEffect(() => {
    const maxCount = parseInt(count?.replace(/\D/g, ""), 10);

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
  }, [values]);

  return (
    <motion.div initial={0} animate={displayCount}>
      +{displayCount.toLocaleString()}
    </motion.div>
  );
};
function StatisticItem({ icon, count, label }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-1">
      <div style={{ color: "#C9B171" }}>{icon}</div>
      <div className="fw-bold">
        {/* <Counter count={count} /> */}
        {count}
      </div>
      <div style={{ fontSize: "13px" }}>{label}</div>
    </div>
  );
}

export default StatisticItem;
