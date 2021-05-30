import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ButtonAppBar from "./components/Nav";

function App() {
  return (
    <Router>
      <ButtonAppBar />
    </Router>
  );
}

export default App;
