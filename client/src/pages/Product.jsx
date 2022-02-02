import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import ShopMenu from "../components/ShopMenu";

const Container = styled.div`
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  min-height: 90vh;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  `;

const Image = styled.img`
  width: 100%;
  min-width: 340px;
  max-width: 600px;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
  ${mobile({ flex: "1" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  margin-top: 50px;
  ${mobile({ padding: "10px"})};
  ${mobile({ marginTop: "0"})};
  `;

const Title = styled.h1`
  font-weight: 200;
  margin-top: 10px;
  `;

const Desc = styled.p`
  max-width: 500px;
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: 2px solid rgba(51, 51, 51, 0.5);
  border: ${props => (props.color === props.selectedColor) && "2px solid teal"};
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  min-width: 120px;
  margin-left: 10px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setColor(res.data.color[0])
        setSize(res.data.size[0])
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = async () => {
    console.log("cart: " ,cart)
    console.log("product: " ,product)
    const index = cart.products.findIndex(
      (cartProduct) =>
        cartProduct.productId + cartProduct.color + cartProduct.size ===
        product._id + color + size
    );
    const newCartProduct = {
      "productId":product._id,
      "img":product.img,
      "title":product.title,
      "price":product.price,
      "quantity":quantity,
      "color":color,
      "size":size
    }
    try {
      console.log("index: ",index)
      if (index === -1) {
        const updatedCart = {"products":[...cart.products,newCartProduct]}
        if (!user.currentUser) {
          dispatch(addProduct({...updatedCart, price:product.price, quantity:quantity, productId:product._id}));
        } else {
          const response = await userRequest.put(`/carts/${user.currentUser._id}`,updatedCart)
          dispatch(addProduct({...response.data, price:product.price, quantity:quantity, productId:product._id}));
        }
      } else  {
        if (!user.currentUser) {
          dispatch(addProduct({price:product.price, quantity:quantity, productId:product._id, color:color,size:size}));
        } else {
          const productsArray = [...cart.products]
          const currentQty = productsArray[index].quantity
          const updatedCart = {"products":[...productsArray.slice(0, index), Object.assign({}, productsArray[index],{quantity:(currentQty + quantity)}), ...productsArray.slice(index + 1)]}
        const response = await userRequest.put(`/carts/${user.currentUser._id}`,updatedCart)
        dispatch(addProduct({...response.data, price:product.price, quantity:quantity,productId:product._id,cartproductId:response.data.products[index]._id}));
        }
      }
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <Container>
      <Announcement />
      <Navbar />
      <ShopMenu/>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            {/* { product.color.length>0 && */}
              <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} selectedColor={color} onClick={() => setColor(c)} />
                ))}
            </Filter>
              {/* } */}
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
