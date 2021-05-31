import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ButtonAppBar from "./components/Nav";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <div>
        <ButtonAppBar />
        <Switch>
          <Route exact path={["/"]}>
            <Home />
          </Route>
          <Route exact path={["/signup"]}>
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
