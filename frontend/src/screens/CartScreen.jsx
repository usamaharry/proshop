import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, ListGroup, Button } from "react-bootstrap";

import { addToCart, removeFromCart } from "../slices/cartSlice";
import Message from "../components/Message";
import CartItem from "../components/CartItem";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const changeQtyHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty: qty }));
  };

  const removeFromCartHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="my-3">Cart Screen</h1>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <CartItem
                  key={item._id}
                  item={item}
                  changeQtyHandler={changeQtyHandler}
                  removeFromCartHandler={removeFromCartHandler}
                />
              );
            })}
          </ListGroup>
        )}
      </Col>

      {cartItems.length > 0 && (
        <Col md="4">
          <Card className="my-3">
            <ListGroup>
              <ListGroup.Item>
                <h2>{`Subtotal (${cartItems.length}) Items`}</h2>$
                {cart.totalPrice}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button onClick={checkOutHandler} className="btn btn-primary">
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default CartScreen;
