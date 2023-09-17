import { Row, Col } from "react-bootstrap";

import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Product from "../components/Product";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">
          {error?.date.message || error?.error}
        </Message>
      ) : (
        <>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm="12" md="6" lg="4" xl="3">
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
