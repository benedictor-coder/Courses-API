import React, { Suspense, lazy, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
// import Popup from "./components/popup/Popup";
import SignIn from "./components/signin/SignIn";
const Header = lazy(() => import("./components/header/Header"));
const Content = lazy(() => import("./components/content/Content"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return !isLoggedIn && setIsLoggedIn(true) ? null : (
                <Redirect to="/signin" />
              );
            }}
          />
          <Route exact path="/signin" component={SignIn} />
          <Suspense
            fallback={
              <div style={{ textAlign: "center" }}>
                <h1 className="heading-secondary">Loading content... </h1>
              </div>
            }
          >
            <Header />
            <Content />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}
{
  /* <Popup
  title={
    <Router>
      <Link to="" className="sign-up heading-secondary">
        Forgot Details?
      </Link>
    </Router>
  }
  content={<SignIn />}
/>
<Suspense
  fallback={
    <div style={{ textAlign: "center" }}>
      <h1 className="heading-secondary">Loading content... </h1>
    </div>
  }
>
  <Header />
  <Content />
</Suspense> */
}
export default App;
