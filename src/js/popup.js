import "babel-core/register";
import "babel-polyfill";

import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { configureStore } from './popup/store';

const store = configureStore();

import App from "./popup/index.jsx";
import "../css/popup.less";
import "../img/logo.png";

render(
    <Provider store={store}>
        <App />
    </Provider>,
    window.document.getElementById("app-container"));
