import { Container } from "react-bootstrap";

import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Welcome to Proshopp</h1>
        </Container>
      </main>
    </>
  );
};

export default App;
