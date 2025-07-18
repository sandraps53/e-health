import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { PrescriptionProvider } from "./context/PrescriptionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrescriptionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrescriptionProvider>
  </StrictMode>
);
