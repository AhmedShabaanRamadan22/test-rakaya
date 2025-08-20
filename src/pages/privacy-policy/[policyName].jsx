import fetchData from "@/utils/fetchData"
import React from "react"
import CustomHead from "@/components/CustomHead"
import Header from "@/components/jobs/Header"
import Container from "@/components/Container"

function PrivacyPolicy({ DataPrivacyPolicy }) {
  const isError = DataPrivacyPolicy?.status === 400

  const renderHeader = () => {
    const title = isError
      ? "السياسة والخصوصية"
      : `السياسة والخصوصية الخاصة بـ ${DataPrivacyPolicy?.private_policy?.name}`
    return (
      <Header
        text="السياسة والخصوصية"
        subTitle={title}
        image="/studio/headers-bg/4.webp"
      />
    )
  }

  const renderContent = () => {
    if (isError) {
      return (
        <div className="mt-5">
          <h1 className="d-flex justify-content-center w-100">
            {DataPrivacyPolicy?.message}
          </h1>
        </div>
      )
    }
    return (
      <Container className="col-lg-10 d-flex flex-column align-items-center py-4 rakayaStudio">
        <div>
          <h1>{DataPrivacyPolicy?.private_policy?.name}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: DataPrivacyPolicy?.private_policy?.content,
            }}
          />
        </div>
      </Container>
    )
  }

  return (
    <>
      <CustomHead
        title="السياسة والخصوصية"
        description={
          isError
            ? "السياسة والخصوصية"
            : `السياسة والخصوصية الخاصة بـ ${DataPrivacyPolicy?.private_policy?.name}`
        }
      />
      {renderHeader()}
      {renderContent()}
    </>
  )
}

export default PrivacyPolicy

export async function getServerSideProps(context) {
  const { policyName } = context.params
  try {
    const DataPrivacyPolicy = await fetchData(`private-policies/${policyName}`)
    return {
      props: { DataPrivacyPolicy },
    }
  } catch (error) {
    return {
      props: {
        DataPrivacyPolicy: {
          status: 400,
          message: "حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقًا.",
        },
      },
    }
  }
}
