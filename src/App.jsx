import React, { useState } from "react";
import HomePage from "./pages/Home";
import UploadFile from "./pages/UploadFile";

import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/uploadFile">
          <UploadFile />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
export default App;
