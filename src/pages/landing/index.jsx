import Container from "@/components/Container";
import Content from "@/components/landing/Content";
import Header from "@/components/landing/Header";
import Marquee from "@/components/landing/Marquee";
import Stats from "@/components/landing/Stats";

const Index = () => {

  return (
    <Container className={`mx-0 px-0 bg-dark `}>
      <Header />
      <Stats />
      <Marquee />
      <Content />
    </Container>
  );
};

export default Index;
