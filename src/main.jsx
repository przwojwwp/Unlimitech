import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";

import "bootstrap/dist/css/bootstrap.css";
import "./less/main.less";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
