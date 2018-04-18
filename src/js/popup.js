import "babel-core/register";
import "babel-polyfill";

import React from "react";
import { render } from "react-dom";

import App from "./popup/index.jsx";
import "../css/popup.less";
import "../img/logo.png";

render(<App />, window.document.getElementById("app-container"));
