import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { restartRegister } from "../redux/userRedux";
import Header from "../components/Header";

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
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  margin-top: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
  margin-left: 1rem;
`;
const Success = styled.span`
  color: teal;
  margin-top: 1rem;
  &a:hover, a:visited, a:link, a:active {
  text-decoration: none;
  color: teal;
  }
`;

const Register = () => {
  const dispatch = useDispatch();
  const {isFetching, error, userRegistered} = useSelector(state => state.user)

  useEffect(() => {
    dispatch(restartRegister())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (e) => {
    e.preventDefault()
    console.log("form submited")
    register(dispatch,{username: values.username, email: values.email, password: values.password});
  }

    const [values, setValues] = useState({
      username: "",
      email: "",
      birthday: "",
      password: "",
      confirmPassword: "",
    });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage:
        "name should be 2-16 characters and shouldn't include any special character!",
      label: "name",
      pattern: "^[A-Za-z0-9]{2,16}$",
      required: true,
    },
    {
      id: 2,
      name: "last name",
      type: "text",
      placeholder: "Last name",
      errorMessage:
        "last name should be 2-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{2,16}$",
      required: true,
    },
    {
      id: 3,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter and 1 number!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Header/>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleClick}>
          {inputs.map((input) => (
          <FormInput
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
          />
          ))}
          <Button disabled={isFetching}>CREATE</Button>
          {error && !userRegistered && <Error>Please try again...</Error>}
          {userRegistered && <Success>User have been registered. You can now <Link style={{fontWeight: 800}} to="/login"> sign in!</Link></Success>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
