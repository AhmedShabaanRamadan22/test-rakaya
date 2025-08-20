import React, { useContext } from "react";
import Container from "../Container";
import Button from "../Button";
import Link from "next/link";
import Map from "../Map";
import { DarkModeContext } from "@/context/DarkModeContext";
import { t } from "i18next";

const Join = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <Container
      className={`py-5 ${isDarkMode ? "bg-primary" : "bg-secondary "} `}
    >
      <div className="row row-cols-1 row-cols-md-2 align-items-center mx-md-3">
        <div>
          <Container className="py-3  col-lg-12 ">
            <div className="mb-3">
              <h3 className="text-white">{t("common:join_family")}</h3>
            </div>
            <div className="w-100 m-auto">
              <h4
                className="text-white fw-light contentJoin text-justify "
                style={{ lineHeight: "1.7" }}
              >
                {t("common:join_desc")}
              </h4>
            </div>
          </Container>
          <Container className="d-flex  mt-2">
            <Link href={"/jobs"}>
              <Button color="third" className="text-primary text-center">
                {t("common:click_more")}
              </Button>
            </Link>
          </Container>
        </div>
        <div className=" mt-5 mt-md-0">
          <Map />
        </div>
      </div>
    </Container>
  );
};

export default Join;
