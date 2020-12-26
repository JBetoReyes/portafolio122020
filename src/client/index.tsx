import * as React from "react";
import { hydrate } from "react-dom";
import Home from "../shared/pages/Home";

console.log("Hello from browser");
hydrate(<Home />, document.getElementById("app"));
