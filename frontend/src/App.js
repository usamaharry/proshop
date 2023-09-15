import { Container } from "react-bootstrap";

import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <HomeScreen />
        </Container>
      </main>
    </>
  );
};

export default App;
