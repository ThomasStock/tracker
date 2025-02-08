import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "jotai";

// Set dark mode as default
document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <Provider>
    <App />
  </Provider>
);

// Register service worker
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceworker.ts", { type: "module" })
      .then((registration) => {
        console.log("SW registered:", registration);
      })
      .catch((error) => {
        console.log("SW registration failed:", error);
      });
  });
}
