import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { addToCart } from "../slices/cartSlice";
import { Rating } from "../components/Rating";
import { useGetProdcutDetailQuery } from "../slices/api/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductDetailScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProdcutDetailQuery(productId);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );

    navigate("/cart");
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">
          {error?.data.message || error?.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md="8">
              <Image
                style={{
                  width: "100%",
                }}
                src={product.image}
                alt={product.name}
                fluid
              />
            </Col>
            <Col md="4">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`(${product.numReviews})`}
                  />
                </ListGroup.Item>
              </ListGroup>

              <Card className="my-5">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h6>Status:</h6>
                      </Col>
                      <Col>
                        <h6>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of stock"}
                        </h6>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h6>Price:</h6>
                      </Col>
                      <Col>
                        <h6>${product.price}</h6>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              setQty(Number(e.target.value));
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (e) => {
                                return (
                                  <option key={e} value={e + 1}>
                                    {e + 1}
                                  </option>
                                );
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn btn-primary"
                      disabled={product.countInStock === 0}
                      style={{
                        width: "100%",
                      }}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetailScreen;
