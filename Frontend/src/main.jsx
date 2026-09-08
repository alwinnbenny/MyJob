import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { JobProvider } from "./Context/JobContext.jsx";
import { UserProvider } from "./Context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <JobProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </JobProvider>
    </BrowserRouter>
  </StrictMode>,
);
