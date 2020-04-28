import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import WrappedApp from "./components/App";

import "./semantic-dist/semantic.css";

ReactDOM.render(
  <Router>
    <WrappedApp />
  </Router>,
  document.getElementById("root")
);
