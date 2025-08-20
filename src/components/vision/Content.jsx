import { isRTL } from "@/utils/Helpers";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Container from "../Container";
const Content = ({ title, children, id }) => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
    }
  }, [router.pathname]);
  return (
    <AnimatePresence mode="wait">
      <Container className="col-lg-9 m-0 overflow-hidden">
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0, x: isRTL() ? "120%" : "-120%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRTL() ? "120%" : "-120%" }}
          transition={{
            type: "spring",
            duration: 0.7,
            ease: "easeInOut",
            stiffness: 120,
            damping: 20,
          }}
        >
          <h1 className="">{title}</h1>
          <div className="fw-medium">{children}</div>
        </motion.div>
      </Container>
    </AnimatePresence>
  );
};

export default Content;
