import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ScrollToTop/>
          <Home />
        </Route>
        <Route path="/products/:category">
          <ScrollToTop/>
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <ScrollToTop/>
          <Product />
        </Route>
        <Route path="/cart">
          <ScrollToTop/>
          <Cart />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
