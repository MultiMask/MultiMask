import "babel-core/register";
import "babel-polyfill";

import controller from "./background/controller";

init();

function init() {
  controller.init();
}
