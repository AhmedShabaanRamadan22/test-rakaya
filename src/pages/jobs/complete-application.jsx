import Container from "@/components/Container";
import CustomHead from "@/components/CustomHead";
import LoadingOverlay from "@/components/LoadingOverlay";
import Main from "@/components/jobs/CompleteApplication/Main";
import FailedRequestJob from "@/components/jobs/FailedRequestJob";
import Header from "@/components/jobs/Header";
import ReceivingOrder from "@/components/jobs/ReceivingOrder";
import useFetch from "@/hooks/useFetch";
import { useMutate } from "@/hooks/useMutate";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

function CompleteApplication({ description }) {
  const [uuid, setUuid] = useState("");
  const { data, isLoading } = useFetch({
    endpoint: `candidate/${uuid}`,
    queryKey: [`candidate/${uuid}`],
  });
  const dataCandidate = data?.data?.candidate;

  const {
    mutate: updateData,
    isPending: loadingData,
    isSuccess: successUpdate,
  } = useMutate({
    mutationKey: [`candidate/${uuid}`],
    endpoint: `candidate/${uuid}`,
    formData: true,
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const uuidValue = queryParams.get("cnd_token");
    setUuid(uuidValue);
  }, []);

  const receivingOrderVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <div>
      <CustomHead title={"اكمال البيانات المطلوبة"} description={description} />
      {isLoading && <LoadingOverlay />}
      <Container className="m-0 p-0 overflow-hidden">
        {!data?.data?.expired_flag ? (
          <>
            <Header
              text={"الوظائف"}
              subTitle={"ركايا  تبحث عنك"}
              image={"/studio/headers-bg/6.webp"}
              location
            />
            <motion.div
              initial="hidden"
              animate="visible"
              variants={receivingOrderVariants}
            >
              <FailedRequestJob message={data?.data?.message} />
            </motion.div>
          </>
        ) : (
          <>
            <Header
              text={`اهلا  ${dataCandidate?.name}`}
              subTitle={" الرجاء اكمال  البيانات المطلوبة"}
              image={"/studio/complete_application_bg.jpg"}
              profile_image={true}
              profileSrc={
                dataCandidate?.attachment_candidate_profile_personal?.value
              }
            />

            {successUpdate ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={receivingOrderVariants}
              >
                <ReceivingOrder
                  code={dataCandidate?.code}
                  message={"تم استكمال البيانات بنجاح"}
                />
              </motion.div>
            ) : (
              <div className="newJob">
                <div>
                  <Main
                    dataCandidate={dataCandidate}
                    loadingData={loadingData}
                    updateData={updateData}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default CompleteApplication;
