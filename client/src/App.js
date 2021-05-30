import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ButtonAppBar from "./components/Nav";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <ButtonAppBar />
      <Home />
    </Router>
  );
}

export default App;
