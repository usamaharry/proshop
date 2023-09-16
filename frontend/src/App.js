import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default App;
