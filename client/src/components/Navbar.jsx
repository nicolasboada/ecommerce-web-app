import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined,} from "@material-ui/icons";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { cleanCart, getProducts } from "../redux/cartRedux";
import { useEffect } from "react";
import { userRequest } from "../requestMethods";

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

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

// const Language = styled.span`
//   font-size: 14px;
//   cursor: pointer;
//   ${mobile({ display: "none" })}
// `;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 5px;
  ${mobile({ marginLeft: "10px" })}
`;

const Input = styled.input`
  border: none;
  margin-left: 5px;
  ${mobile({ width: "50px" })}
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
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1, justifyContent: "right", marginRight: "15px" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: ${(props) => props.display === "none" && "none"};
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  const { currentUser } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(cleanCart())
    dispatch(logout())
  }
//   useEffect(() => {
//     if (!currentUser) return;
//     userRequest
//     .get(`carts/find/${currentUser._id}`)
//     .then((res) => dispatch(getProducts(res.data)))
//     .catch(error => console.log(error))
// }, [dispatch,currentUser])

  useEffect(() => {
    if (!currentUser) return;
    userRequest
    .get(`carts/find/${currentUser._id}`)
    .then(res => {
      if (res.data.products.length===0 && cart.products.length>0 ) {
        console.log('el carro estaba vacio')
        const currentCart = {"products":[...cart.products]}
        userRequest.put(`/carts/${currentUser._id}`, currentCart)
      } 
      else {dispatch(getProducts(res.data))}
    })
    .catch(error => console.log(error))
}, [currentUser]) // eslint-disable-line react-hooks/exhaustive-deps




  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <Language>EN</Language> */}
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16, marginRight: 5 }} />
          </SearchContainer>
        </Left>
        <Center>
        <Link to="/">
          <Logo>STORE.</Logo>
        </Link>
        </Center>
        <Right>
          {currentUser ? 
          <>
          <AccountCircleOutlinedIcon style={{marginRight: "0.3rem"}}/>
          <span style={{cursor: "default"}}>{currentUser.username}</span>
          <ExitToAppOutlinedIcon style={{marginLeft: "0.9rem", cursor: "pointer"}} onClick={handleClick}/>
          </>:
          <>
          <Link to="/register">
          <MenuItem display="none">REGISTER</MenuItem>
          </Link>
          <Link to="/login">
          <MenuItem >SIGN IN</MenuItem>
          </Link>
          </>
          }
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
