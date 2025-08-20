import Link from "next/link";
import React from "react";
import LinkedIn from "../icons/LinkedIn";
import Image from "next/image";
import PatternIconTwo from "../icons/PatternIconTwo";

function Team({ name, position, image, desc }) {
  return (
    <div
      className="my-2 align-items- px-1 py-4 teamShadow position-relative "
      style={{ height: "185px", borderRadius: "20px" }}
    >
      <div className=" d-flex ">
        <div className="">
          <Image
            alt={name + " - " + position}
            src={image}
            width={50}
            height={50}
            className="rounded-5 p-1"
            style={{ border: "1px solid #C9B171", objectFit: "cover" }}
          />
        </div>
        <div className="p-1">
          <h6 className="" style={{ fontSize: "14px" }}>
            {name}
          </h6>

          <p
            style={{
              fontSize: "10px",
              border: "1px solid #C9B171",
              width: "fit-content",
              borderRadius: "2px",
            }}
            className="p-0 mb-1 text-gold  px-1 w-fit  "
          >
            {position}{" "}
          </p>
          <p style={{ fontSize: "10px", textAlign: "justify" }}>{desc}</p>
        </div>
        <div className="position-absolute patternTeam">
          <div>
            <PatternIconTwo className={"img-fluid"} style={{}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
