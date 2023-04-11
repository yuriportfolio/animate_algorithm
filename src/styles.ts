import type { View2D } from "@motion-canvas/2d/lib/components";

export function applyViewStyles(view: View2D) {
  view.lineHeight(64);
}

export const Colors = {
  whiteLabel: "rgba(255, 255, 255, 0.9)",
  blackLabel: "rgba(0, 0, 0, 0.87)",
  background: "#141414",
  surface: "#242424",
  surfaceLight: "#c0b3a3",

  white: "#ffffff",
  black: "#000000",
  
  // Primary colors
  red: "#f44336",
  pink: "#e91e63",
  purple: "#9c27b0",
  deepPurple: "#673ab7",
  indigo: "#3f51b5",
  blue: "#2196f3",
  lightBlue: "#03a9f4",
  cyan: "#00bcd4",
  teal: "#009688",
  green: "#4caf50",
  lightGreen: "#8bc34a",
  lime: "#cddc39",
  yellow: "#ffeb3b",
  amber: "#ffc107",
  orange: "#ff9800",
  deepOrange: "#ff5722",
};

export const Typography = {
  default: {
    fontFamily: "Nunito",
    fontWeight: 400,
    fill: Colors.whiteLabel,
  },
  headerOnDark: {
    fontFamily: "Nunito",
    fontWeight: 400,
    fontSize: 72,
    fill: Colors.whiteLabel,
  },
};
