import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &a:hover, a:visited, a:link, a:active {
  text-decoration: none;
  color: black;
  }
  ${mobile({ padding: "10px 0px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  /* color: black; */
  ${mobile({ fontSize: "24px" })}
`;

const Header = () => {

  return (
    <Container>
      <Wrapper>
        <Center>
        <Link to="/">
          <Logo>STORE.</Logo>
        </Link>
        </Center>
      </Wrapper>
    </Container>
  );
};

export default Header;
