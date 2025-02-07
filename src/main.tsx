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
