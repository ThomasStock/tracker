import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "jotai";
import { registerSW } from "virtual:pwa-register";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Set dark mode as default
document.documentElement.classList.add("dark");

// Register service worker
if (import.meta.env.PROD) {
  registerSW({ immediate: true });
}

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <Provider>
    <RouterProvider router={router} />
  </Provider>
);
