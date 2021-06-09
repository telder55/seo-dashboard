import React, { Suspense, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ButtonAppBar from "./components/Nav";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "./App.css";

import { AuthProvider, AuthContext } from "./context/AuthContext";

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() ? <div>{children}</div> : <Redirect to="/" />
      }
    ></Route>
  );
};

const UnauthenticatedRoutes = () => (
  <>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
    </Switch>
  </>
);

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <AuthenticatedRoute path="/dashboard">
            <Dashboard />
          </AuthenticatedRoute>
          <UnauthenticatedRoutes />
        </Switch>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <Router>
      <div>
        <ButtonAppBar />
        <Switch>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
