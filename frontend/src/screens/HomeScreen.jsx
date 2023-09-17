import { Row, Col } from "react-bootstrap";

import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Product from "../components/Product";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h6>{error?.date.message || error?.error}</h6>
      ) : (
        <>
          <h1>Latest Products</h1>
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
