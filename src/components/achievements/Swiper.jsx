import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "@/styles/achievements.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
/**
 * @param {{imgArray:string[]}}
 */

const ImgSwiper = ({ imgArray }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      breakpoints={{
        600: {
          slidesPerView: 2,
        },
      }}
      autoplay={{
        delay: 3000,
      }}
      loop={true}
      modules={[Autoplay]}
      className="mySwiper col-lg-10 py-5"
    >
      {imgArray.map((img, index) => {
        return (
          <SwiperSlide key={index}>
            <Image alt="image" src={img} className={`img-fluid ${styles["img-card"]} rounded`}  width={100} height={100}/>
            <p className="text-white fs-4">Lorem ipsum dolor sit amet.</p>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImgSwiper;