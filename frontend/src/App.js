import React from "react";
import Devices from "./components/Devices";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Devices />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
