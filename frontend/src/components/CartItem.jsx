import { Row, Col, Button, Form, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item, changeQtyHandler, removeFromCartHandler }) => {
  return (
    <ListGroup.Item key={item._id}>
      <Row>
        <Col xs="4" md="2">
          <Image rounded fluid src={item.image} alt={item.name} />
        </Col>
        <Col xs="8" md="3">
          <Link to={`/product/${item._id}`}>{item.name}</Link>
        </Col>
        <Col xs="4" md="2">
          <strong
            className="d-flex align-items-center align-items-md-start"
            style={{
              height: "100%",
            }}
          >
            ${item.price}
          </strong>
        </Col>

        <Col xs="4" md="2">
          <Form.Control
            as="select"
            value={item.qty}
            onChange={(e) => {
              changeQtyHandler(item, Number(e.target.value));
            }}
          >
            {[...Array(item.countInStock).keys()].map((e) => {
              return (
                <option key={e} value={e + 1}>
                  {e + 1}
                </option>
              );
            })}
          </Form.Control>
        </Col>

        <Col xs="4" md="2">
          <Button
            onClick={() => removeFromCartHandler(item._id)}
            type="button"
            className="btn-light"
          >
            <FaTrash />
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartItem;
