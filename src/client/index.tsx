import * as React from "react";
import { hydrate } from "react-dom";
import App from "../shared/App";

console.log("Hello from browser");
hydrate(<App />, document.getElementById("app"));
