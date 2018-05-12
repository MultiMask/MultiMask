import "babel-core/register";
import "babel-polyfill";

import controller from "./background/controller";

controller.init();
