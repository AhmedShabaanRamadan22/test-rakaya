import Container from "@/components/Container";
import CustomHead from "@/components/CustomHead";
import Header from "@/components/jobs/Header";
import VisionLayout from "@/components/vision/VisionLayout";
import { pillarsData } from "@/data";
import React from "react";

const PillarHeader = ({ title, icon }) => (
  <div className="d-flex align-items-baseline mb-1 gap-3 text-gold">
    <i className={`${icon} fs-5`}></i>
    <h5>{title}</h5>
  </div>
);

const description =
  "قيم نعتز بها.. نؤمن بأن كل عمل لا يتم بإتقان من غير أسس أخلاقية مهنية نسترشد بها وترسّخ علاقتنا بعملائنا";
const Pillars = () => (
  <>
    <CustomHead title={"أركاننا"} description={description} />

    <Header text={"أركاننا"} />

    <VisionLayout title="قيم نعتز بها">
      <div className="me-0 col-12 col-lg-10" style={{padding:"0 12px"}}>
        <p className="text-justify">
          نؤمن بأن كل عمل لا يتم بإتقان من غير أسس أخلاقية مهنية نسترشد بها
          وترسّخ علاقتنا بعملائنا
        </p>
        <span className="badge bg-primary  border-primary py-2 px-3 text-white fw-bold fs-5 my-2">
          الرؤية
        </span>
        <p className="text-justify">
          هدفنا أن تكون ركايا مركزًا عالميًا للخبرات ومرجعًا يُستقى منه من خلال
          تقديم أفضل الحلول بمعايير عالمية متطورة مع فهم فريد للسوق المحلي
        </p>
        {pillarsData.map((pillar) => (
          <React.Fragment key={pillar.title}>
            <PillarHeader title={pillar.title} icon={pillar.icon} />
            <p>{pillar.description}</p>
          </React.Fragment>
        ))}
      </div>
    </VisionLayout>
  </>
);

export default Pillars;
