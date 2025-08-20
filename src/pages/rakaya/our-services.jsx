import Container from "@/components/Container";
import CustomHead from "@/components/CustomHead";
import Header from "@/components/jobs/Header";
import VisionLayout from "@/components/vision/VisionLayout";
import Card from "@/components/vision/services/Card";
import { services } from "@/data";

const Services = () => {
  const description = "نؤمن بأن كل عمل لا يتم بإتقان من غير أسس أخلاقية مهنية نسترشد بها وترسّخ علاقتنا بعملائنا "
  return (
    <>
      <CustomHead title={"خدماتنا"} description={description} />

      <Header text={"خدماتنا"} />

      <VisionLayout title="خدماتنا">
        <p>
          نؤمن بأن كل عمل لا يتم بإتقان من غير أسس أخلاقية مهنية نسترشد بها
          وترسّخ علاقتنا بعملائنا 
        </p>
        <Container className="row ">
          {services?.map((item, index) => (
            <Card title={item?.title} key={index}>
              <p className="mb-1 my-2 text-justify">{item?.subTitle}</p>
              {item?.items.map((point, index) => (
                <p className="my-1 text-justify" key={index}>
                  - {point?.item}
                </p>
              ))}
            </Card>
          ))}
        </Container>
      </VisionLayout>
    </>
  );
};

export default Services;
