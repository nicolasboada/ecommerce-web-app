import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    height: 30px;
    background-color: white;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    &a:hover, a:visited, a:link, a:active {
        text-decoration: none;
        color: black;
    }
`;

const List = styled.ul`
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    width: 100%;
`;

const ListItem = styled.li`
    padding: 0 1rem ;
    position: relative;
    &::after{
        content: "";
        background-color: #707070;
        height: 2px;
        position: absolute;
        left: 0;
        top: 120%;
        width: 100%;
        transform: scaleX(0);
        transform-origin: center;
    }
    &:hover::after{
        transform: scaleX(0.7);
    }
    &:hover{
        color: #707070;
    }
`;

const ShopMenu = () => {
  return (   
        <Container>
            <List>
                <Link to="/products/Shirts">
                <ListItem>Shirts</ListItem>
                </Link>
                <Link to="/products/Hoodies">
                <ListItem>Hoodies</ListItem>
                </Link>
                <Link to="/products/Caps">
                <ListItem>Caps</ListItem>
                </Link>
            </List>
        </Container>
    );
};

export default ShopMenu;
