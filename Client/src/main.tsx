import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/home.tsx";
import RSVP from "./pages/rsvp.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/rsvp" element={<RSVP />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
