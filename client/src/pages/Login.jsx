import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { cleanErrors } from "../redux/userRedux";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://burst.shopifycdn.com/photos/stylish-man-outdoors.jpg")
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  min-width: 285px;
  max-width: 370px;
  padding: 20px;
  border-radius: 2%;
  background-color: white;
  /* ${mobile({ width: "75%" })} */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Item = styled.div`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
  &:hover, :visited, :link, :active {
   color: black;
   }
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const inputUsernameRef = useRef()
  const inputPasswordRef = useRef()
  const { isFetching, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(cleanErrors())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (e) => {
    e.preventDefault();
    if (username === "" ) {
      inputUsernameRef.current.focus();
      return;
    }  
    if (password === "" ) {
      inputPasswordRef.current.focus();
      return;
    }  
    login(dispatch, { username, password });
  };
  
  return (
    <Container>
      <Header />
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            ref={inputUsernameRef}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            />
          <Input
            ref={inputPasswordRef}
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}
          {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
          <Link to="/register">
          <Item>CREATE A NEW ACCOUNT</Item>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
