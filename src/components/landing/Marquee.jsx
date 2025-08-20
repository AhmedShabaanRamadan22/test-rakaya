import styles from "@/styles/landing.module.scss";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import Container from "../Container";
import { t } from "i18next";

/**
 * @param {{imgArray:string[]; reverse:boolean;}}
 */
const Bar = ({ imgArray, reverse }) => {
  return (
    <Marquee
      className={`my-4`}
      speed={reverse ? 50 : 80}
      autoFill
      direction={reverse ? "right" : "left"}
    >
      {imgArray.map((img, index) => {
        return (
          <div key={index} className="border m-1 rounded-2 mainShadow ">
            <Image
              width={0}
              height={0}
              alt="image"
              src={img}
              className={`rounded w-auto rounded-2 mx-4 img-fluid ${styles["img-card"]}`}
              style={{ maxHeight: "300px" , padding:"5px" }}
            />
          </div>
        );
      })}
    </Marquee>
  );
};
const images = [
  "/rakaya/5chefs.webp",
  "/rakaya/ektimal.webp",
  "/rakaya/Etqan.webp",
  "/rakaya/qfsco.webp",
  "/rakaya/speed-rent.webp",
  "/rakaya/taqniyah.webp",
];
const MyMarquee = () => {
  return (
    <div className="overflow-hidden">
      <h2 className="text-center my-3 text_Dark">{t("common:success_partners")}</h2>

      <Container className=" py-3 px-0 overflow-hidden" dir={"ltr"}>
        <Container className="mb-2">
          <Bar imgArray={images} />
          <Bar imgArray={images} reverse />
        </Container>
        {/* <Container className="text-center" dir={i18n.dir(i18n.language)}>
          <h2 className="text-gold">Best in the industry</h2>
          <p className="text-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem delectus facilis voluptatum obcaecati sapiente quidem
            tenetur modi mollitia amet, similique ab esse tempora nemo harum nam
            tempore? Rem amet dolores, quam quis recusandae asperiores ipsa,
            excepturi unde enim deleniti alias dicta. Dolore, minima excepturi!
            Qui, est vitae repellat cumque ullam ea! Dolorum est iste accusamus
            minus corporis optio harum et neque praesentium. Aperiam minus quis
            non dolor, consequuntur fugit. Sint sunt iure ratione corporis
            libero distinctio, quidem facilis reprehenderit ab.
          </p>
        </Container> */}
      </Container>
    </div>
  );
};

export default MyMarquee;
