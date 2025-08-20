import React from "react";
import Container from "../Container";
import ImgContainer from "../ImgContainer";
import Image from "next/image";

const LargeCard = ({ date, title, description, source, imgUrl }) => {
   return (
      <Container className="col-lg-5 my-3">
         <Container className="overflow-hidden rounded p-0 m-0 mb-2">
            <ImgContainer>
               <Image  src={imgUrl} alt="" className="img-fluid rounded" width={200} height={200} />
            </ImgContainer>
         </Container>
         <p className="text-black-50 mb-0">{date}</p>
         <h3 className="fw-bold mb-0">{title}</h3>
         <p className="text-secondary mb-2 text-break">{description}</p>
         <a href="" className="text-secondary fw-bold text-decoration-none">
            {source}
         </a>
      </Container>
   );
};

export default LargeCard;
