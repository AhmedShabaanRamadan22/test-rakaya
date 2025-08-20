import Container from "@/components/Container";
import CustomHead from "@/components/CustomHead";
import Content from "@/components/landing/Content";
import Header from "@/components/landing/Header";
import Marquee from "@/components/landing/Marquee";
import Stats from "@/components/landing/Stats";

export default function Home() {
  const description =
    "في زمن الوصول السريع ، للأشخاص والأماكن والمعلومة ، ركايا تحمل معنيين  الأول هو البئر الذي لا نفاذ له كذلك أفكارنا ، إبداعنا ، شغفنا ، عطائنا  الثاني الاعتمادية فنحن نملك مستشارين يُرتكى عليهم";
  return (
    <>
      <CustomHead customTitle={"ركايا البديعة"} description={description} />
      <Container className="mx-0 px-0">
        <Header />
        <Stats />
        <Marquee />
        <Content />
      </Container>
    </>
  );
}
