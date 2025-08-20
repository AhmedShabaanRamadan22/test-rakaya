import Container from "../Container"
import Content from "./Content"
import SideMenu from "./SideMenu"
const VisionLayout = ({ title, children }) => {

  return (
    <>
      <Container className="d-flex flex-wrap col-12 col-lg-10 my-3 my-lg-5 text_Dark ">
        <SideMenu />
        <Content title={title} id={"content"}>
          {children}
        </Content>
      </Container>
    </>
  )
}

export default VisionLayout
