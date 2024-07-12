import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ContextProvider } from "./context/Context.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
