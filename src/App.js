import React from "react";
import "../src/styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Home from "./Home";
import Invoice from "./Invoice";
import Error from "./Error";


function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/invoice/:id" component={Invoice} />
        <Route exact path="*" component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
