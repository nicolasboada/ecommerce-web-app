import { Add, Remove, DeleteOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { decreaseQuantity, getProducts, increaseQuantity, removeProduct } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import { mobile } from "../responsive";
// import StripeCheckout from "react-stripe-checkout";
// import { useEffect, useState } from "react";
// import { userRequest } from "../requestMethods";
// import { useHistory } from "react-router";

// const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 35px 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ flexDirection: "row", justifyContent: "space-evenly", alignItems: "baseline", margin: "10px" })}`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-bottom: 20px;
  ${mobile({ marginBottom: "20px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [estimatedShipping, setEstimatedShipping] = useState(0)
  const [shippingDiscount, setShippingDiscount] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
      if (!user.currentUser) return;
      userRequest
      .get(`carts/find/${user.currentUser._id}`)
      .then((res) => dispatch(getProducts(res.data)))
      .catch(error => console.log(error))
  }, [dispatch,user.currentUser])

  useEffect(() => {
    if (cart.total> 50) {setShippingDiscount(-5.90)}
    else {setShippingDiscount(0)}
    if (cart.products.length> 0) {setEstimatedShipping(5.90)}
    else {setEstimatedShipping(0)}
  }, [cart])

  const handleDelete = async (product) => {
    if (!user.currentUser) {
      dispatch(removeProduct({...product}))
      return;
    }
    const index = cart.products.findIndex((cartItem) => cartItem._id === product._id)
    const updatedCart = {"products":[...cart.products.slice(0, index), ...cart.products.slice(index + 1)]}
    await userRequest.put(`/carts/${user.currentUser._id}`,updatedCart)
    dispatch(removeProduct({...product}))
  }
  const handleIncrease = async (product) => {
    if (!user.currentUser) {
      dispatch(increaseQuantity({...product}))
      return;
    }
    const index = cart.products.findIndex((cartItem) => cartItem._id === product._id)
    const updatedObject = Object.assign({}, cart.products[index],{quantity:(cart.products[index].quantity + 1)})
    const updatedCart = {"products":[...cart.products.slice(0, index),updatedObject, ...cart.products.slice(index + 1)]}
    await userRequest.put(`/carts/${user.currentUser._id}`,updatedCart)
    dispatch(increaseQuantity({...product}))
  }
  const handleDecrease = async (product) => {
    if (product.quantity <= 1) return;
    if (!user.currentUser) {
      dispatch(decreaseQuantity({...product}))
      return;
    }
    const index = cart.products.findIndex((cartItem) => cartItem._id === product._id)
    const updatedObject = Object.assign({}, cart.products[index],{quantity:(cart.products[index].quantity - 1)})
    const updatedCart = {"products":[...cart.products.slice(0, index),updatedObject, ...cart.products.slice(index + 1)]}
    await userRequest.put(`/carts/${user.currentUser._id}`,updatedCart)
    dispatch(decreaseQuantity({...product}))
  }



  // const [stripeToken, setStripeToken] = useState(null);
  // const history = useHistory();

  // const onToken = (token) => {
  //   setStripeToken(token);
  // };

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await userRequest.post("/checkout/payment", {
  //         tokenId: stripeToken.id,
  //         amount: 500,
  //       });
  //       history.push("/success", {
  //         stripeData: res.data,
  //         products: cart, });
  //     } catch {}
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken, cart.total, history]);
  
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to={"/"}>
          <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>  
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product.productId}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={()=>handleIncrease(product)}/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={()=>handleDecrease(product)}/>
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                  <DeleteOutline onClick={()=>handleDelete(product)}/>
                </PriceDetail>
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ {estimatedShipping}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ {shippingDiscount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total + estimatedShipping + shippingDiscount }</SummaryItemPrice>
            </SummaryItem>
            {/* <StripeCheckout
              name="Store Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            > */}
              <Button>CHECKOUT NOW</Button>
            {/* </StripeCheckout> */}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
