import { makeProject } from "@motion-canvas/core";

import reverseArray from "./scenes/reverse-array?scene";
import "./global.css"; // <- import the css

export default makeProject({
  scenes: [reverseArray],
});
