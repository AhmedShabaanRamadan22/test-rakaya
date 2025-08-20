import React from "react";
import Container from "../Container";
import ImgContainer from "../ImgContainer";
import Image from "next/image";
import Link from "next/link";
import ShareSocialComp from "../ShareSocialComp";
import PreviewImage from "../PreviewImage";

const SmallCard = ({ title, description, imgUrl, href }) => {
  return (
    <Container className="d-lg-flex my-lg-3 p-0">
      <PreviewImage url={imgUrl}>
        <ImgContainer
          className="col-lg-5 my-3 my-lg-0 rounded shadow "
          style={{ width: "200px", height: "200px" }}
        >
          {/* <Link href={`${href ? href : ""}`} target="_blank"> */}
          <Image
            className="img-fluid rounded w-100 h-100"
            src={imgUrl}
            alt="image"
            srcSet=""
            height={0}
            width={0}
            style={{ objectFit: "cover" }}
          />
          {/* </Link> */}
        </ImgContainer>
      </PreviewImage>
      <Container className="col-lg-6  mx-lg-3 p-0 position-relative">
        <Link
          href={`${href ? href : ""}`}
          target="_blank"
          className="fs-5 fw-bold text_Dark"
        >
          {title}
        </Link>
        <p className="text-break text-justify mb-0 text_Dark">{description}</p>
        {href && <ShareSocialComp url={href} />}
      </Container>
    </Container>
  );
};

export default SmallCard;
