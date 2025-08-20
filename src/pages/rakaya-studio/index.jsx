import Container from "@/components/Container";
import CustomHead from "@/components/CustomHead";
import ImgContainer from "@/components/ImgContainer";
import PatternImage from "@/components/icons/PatternImage";
import Header from "@/components/jobs/Header";
import SmallCard from "@/components/services/SmallCard";
import { postsStudio } from "@/data";
import Image from "next/image";
import React from "react";

const index = () => {
  const description = "جميع أحداث ركايا في مكان واحد";
  return (
    <>
      <CustomHead title={"قُمرة ركايا"} description={description} />
      <Header
        text={"قُمرة ركايا"}
        subTitle={"هنا جميع أحداث ركايا"}
        image={"/studio/headers-bg/4.webp"}
      />

      <Container className="col-lg-10 d-flex flex-column align-items-center py-4 rakayaStudio">
        <h1 className="align-self-start text_Dark">أبطال ركايا في موسم حج ١٤٤٤ هـ</h1>
        <Container className="col-lg-11 px-4">
          <iframe
            // width="560"
            height="315"
            src="https://www.youtube.com/embed/cO1QxpxQn-Q?si=mDmncDvXMfp5OSxa"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-100 rounded my-3 mb-4"
          ></iframe>
        </Container>
        {postsStudio.map((item, index) => (
          <div key={index} className="col-lg-12 ">
            <h1 className="align-self-start text_Dark">{item?.headTitle}</h1>
            <Container className="d-flex align-items-center flex-lg-row flex-column-reverse gap-3 gap-lg-0">
              <Container className="col-lg-5">
                {item?.posts?.map((supItem, index) => (
                  <SmallCard
                    key={index}
                    title={supItem?.title}
                    description={supItem?.desc}
                    footer={"2024 Jan 14"}
                    imgUrl={supItem?.image}
                    href={supItem?.href}
                  />
                ))}
              </Container>
              <Container className="col-lg-5  ">
                <ImgContainer
                  className="rounded coverImageStudio position-relative "
                  style={{ height: "300px" }}
                >
                  <Image
                    className="img-fluid rounded"
                    src={item?.coverPost}
                    alt=""
                    srcSet=""
                    width={0}
                    height={0}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {item?.showPattern && (
                    <div className="position-absolute patternImage">
                      <PatternImage className={"w-100 h-100"} />
                    </div>
                  )}
                </ImgContainer>
              </Container>
            </Container>
            {index !== postsStudio.length - 1 && <hr className="col-12 my-5" />}
          </div>
        ))}
      </Container>
    </>
  );
};

export default index;
