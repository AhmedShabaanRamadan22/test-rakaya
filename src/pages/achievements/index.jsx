import Container from "@/components/Container";
import SmallSwiper from "@/components/achievements/SmallSwiper";
import Swiper from "@/components/achievements/Swiper";
import Image from "next/image";
import React from "react";

const images = [
  "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
const index = () => {
  return (
    <Container className="px-0 my-3">
      <Container className="col-lg-10">
        <h1 className="fw-bold">Our Achievements</h1>
        <div className="d-flex align-items-top gap-2">
          <hr className="" style={{ width: 20 }} />
          <p className="col-10 col-lg-9 py-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
            voluptatibus iste magni sapiente quia? Minima reiciendis eius
            obcaecati nemo corporis incidunt, quam magnam aliquam id, delectus
            non suscipit, deserunt natus.
          </p>
        </div>
      </Container>
      <Container className="mx-0 px-0 bg-black">
        <div className="" style={{ maxHeight: "75vh", overflow: "hidden" }}>
          <Image
            width={null}
            height={null}
            src="https://images.unsplash.com/photo-1584282479918-1ea22427dc0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="img"
            className="img-fluid"
            style={{ minWidth: "100%" }}
          />
        </div>
        <Container className="col-lg-10 py-4">
          <h1 className="text-white">Hello World</h1>
          <Swiper imgArray={images} />
        </Container>
      </Container>
      <Container className="col-lg-10 my-4">
        <h2>Partners</h2>
      </Container>
      <Container className="bg-black py-5">
        <Container className="col-lg-10">
          <h1 className="text-white">Hello World</h1>
          <SmallSwiper imgArray={images} />
        </Container>
      </Container>
    </Container>
  );
};

export default index;
