import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { Analytics } from "@vercel/analytics/next";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(console.error);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Analytics />
    <App />
  </StrictMode>
);
