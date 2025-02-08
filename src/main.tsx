import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "jotai";
import { registerSW } from "virtual:pwa-register";

// Set dark mode as default
document.documentElement.classList.add("dark");

// Register service worker
if (import.meta.env.PROD) {
  registerSW({ immediate: true });
}

createRoot(document.getElementById("root")!).render(
  <Provider>
    <App />
  </Provider>
);
