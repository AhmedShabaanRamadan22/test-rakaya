import React from "react";
import img1 from "../../../assets/Applications/figma.png";
import img2 from "../../../assets/Applications/jisr.png";
import img3 from "../../../assets/Applications/googel.png";
import img4 from "../../../assets/Applications/trello.png";
import Image from "next/image";
import Link from "next/link";

function CardApplication() {
  // const images = [img1, img2, img3, img4];
  const images = [
    {
      image: img1,
      link: "https://www.figma.com/",
    },
    {
      image: img2,
      link: "https://www.jisr.net/ar/about-jisr",
    },
    {
      image: img3,
      link: "https://www.google.com/",
      width: "45",
    },
    {
      image: img4,
      link: "https://trello.com/",
    },
  ];

  return (
    <div className="row row-cols-2 row-cols-md-4 mx-md-1  gap-2 justify-content-center justify-content-md-start  align-items-between mb-5 over_margin">
      {images?.map((item, index) => (
        <Link
          href={`${item?.link}`}
          key={index}
          target="_blank"
          className="teamShadow rounded-4 d-flex align-items-center carApp justify-content-center"
        >
          <div>
            <div className="">
              <Image
                alt="image"
                src={item?.image}
                width={item?.width || 0}
                height={0}
                className="w-auto"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CardApplication;
