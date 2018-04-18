import React from "react";
import { render } from "react-dom";

import App from "./dialog/index.jsx";
import "../css/dialog.less";

render(<App />, window.document.getElementById("app-container"));
