import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #bdbbbb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  `;

const Slide = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  `;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: hidden;
  flex: 1 1 65%;
  `;

const Image = styled.img`
  object-fit: cover;
  `;

const InfoContainer = styled.div`
  flex: 1 1 35%;
  padding: 50px;
  `;

const Title = styled.h1`
  font-size: 50px;
  color: #${(props) => props.cl};
  `;

const Desc = styled.p`
  margin: 50px 50px 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  color: #${(props) => props.cl};
  `;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  color: #${(props) => props.cl};
  background-color: transparent;
  cursor: pointer;
  `;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title cl={item.cl}>{item.title}</Title>
              <Desc cl={item.cl}>{item.desc}</Desc>
              <Link to={`/products/${item.cat}`}>
                <Button cl={item.cl}>SHOW NOW</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
