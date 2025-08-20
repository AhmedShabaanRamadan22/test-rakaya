import Container from "@/components/Container";
import CustomHead from "@/components/CustomHead";
import FinalSubmit from "@/components/contact-us/FinalSubmit";
import MainData from "@/components/contact-us/MainData";
import Header from "@/components/jobs/Header";
import { usePostData } from "@/hooks/usePostData";
import React from "react";

const Index = () => {
  const { isLoading, postData, isSuccess } = usePostData("/contact-us");
  const description = "يمكنك الوصول لنا سريعًا عبر التواصل معنا على بريد أهلًا";
  return (
    <>
      <CustomHead title={"تواصل معنا"} description={description} />

      <Header text={"تواصل معنا"} />

      <Container className="px-3 px-md-0  col-lg-6 my-5">
        {isSuccess ? (
          <FinalSubmit />
        ) : (
          <>
            <p style={{ lineHeight: "2.2", fontWeight: "500" }} className="text_Dark">
              أهلًا، في حال كنت تود التواصل معنا والوصول لنا سريعًا.. يمكنك
              التواصل معنا على بريد أهلًا، وسنقوم بالرد عليك وتوجيهك
              للشخص المطلوب فورًا
            </p>
            <MainData postData={postData} isLoading={isLoading} />
          </>
        )}
      </Container>
    </>
  );
};

export default Index;
