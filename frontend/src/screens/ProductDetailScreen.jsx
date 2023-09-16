import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Rating } from "../components/Rating";
import products from "../products";

const ProductDetailScreen = () => {
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

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
              <Rating value={product.rating} text={`(${product.numReviews})`} />
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
                      {product.countInStock > 0 ? "In Stock" : "Out of stock"}
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

              <ListGroup.Item>
                <Button
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
  );
};

export default ProductDetailScreen;
