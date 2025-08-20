import Container from "@/components/Container";
import CustomHead from "@/components/CustomHead";
import Header from "@/components/jobs/Header";
import CardApplication from "@/components/vision/CardApplication";
import VisionLayout from "@/components/vision/VisionLayout";
import { program } from "@/data";
import Link from "next/link";
import React from "react";
const Program = ({ title, description, items, href }) => (
  <Container>
    <div className="d-flex align-items-baseline mb-1 gap-3 text-gold">
      <i className="bi bi-grid-1x2 fs-4"></i>
      <Link href={`${href}`} target="_blank">
        <h4>{title}</h4>
      </Link>
    </div>
    <p>{description}</p>
    <ul className="mx-3">
      {items?.map((item, index) => (
        <li key={index}>{item?.item}</li>
      ))}
    </ul>
  </Container>
);

const programs = () => {
  const description = "هنا نبذة عن البرامج التي تسهّل عملنا بشكل أفضل، و تجعلنا نعمل بشكل أمثل"
  return (
    <>
      <CustomHead title={"برامج نستخدمها"}description={description} />

      <Header text={"برامج نستخدمها"} />

      <VisionLayout>
        <p>
        هنا نبذة عن البرامج التي تسهّل عملنا بشكل أفضل، و تجعلنا نعمل بشكل أمثل

        </p>
        {program?.map((item, index) => (
          <Program
            key={index}
            title={item?.title}
            description={item?.description}
            items={item?.items}
            href={item?.href}
          />
        ))}

        <CardApplication />
      </VisionLayout>
    </>
  );
};

export default programs;
