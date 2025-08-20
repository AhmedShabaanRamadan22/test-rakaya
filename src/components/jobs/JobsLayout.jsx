import React from "react";
import CustomHead from "../CustomHead";
import Container from "../Container";
import Header from "./Header";
import Menu from "./Menu";

function JobsLayout({ children, hiddenMenu }) {
  const description =
    "نبحث عن الشخص الطموح الذي يسعى لتحقيق التميّز والنجاح في بيئة عمل إيجابية ومحفزة، انضم إلينا اليوم وانطلق في رحلة تطور مهني مثيرة!";

  return (
    <div>
      <CustomHead title={"الوظائف"} description={description} />

      <Container className="m-0 p-0 overflow-hidden">
        <Header
          text={"الوظائف"}
          subTitle={"ركايا  تبحث عنك"}
          image={"/studio/headers-bg/6.webp"}
          location
        />
        {hiddenMenu ? "" : <Menu />}
        <div className="newJob">{children}</div>
      </Container>
    </div>
  );
}

export default JobsLayout;
