import "./App.css";
import TodoTask from "./pages/TodoTask/TodoTask";
import TodoForm from "./components/TodoForm/TodoForm";
import { Container } from "react-bootstrap";
function App() {
  return (
    <div className="App">
      <Container>
        <TodoTask />
      </Container>
    </div>
  );
}

export default App;
