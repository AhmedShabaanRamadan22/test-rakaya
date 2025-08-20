import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "@/styles/achievements.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper/modules";
import Image from "next/image";
/**
 * @param {{imgArray:string[]}}
 */

const SmallSwiper = ({ imgArray }) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={30}
      breakpoints={{
        600: {
          slidesPerView: 3,
        },
        980: {
          slidesPerView: 4,
        },
      }}
      autoplay={{
        delay: 2000,
      }}
      loop={true}
      modules={[Autoplay]}
      className="mySwiper col-lg-10 py-5"
    >
      {imgArray.map((img, index) => {
        return (
          <SwiperSlide key={index}>
            <Image
              alt="image"
              src={img}
              className={`img-fluid ${styles["img-small-card"]} rounded`}
              width={null}
              height={null}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SmallSwiper;
