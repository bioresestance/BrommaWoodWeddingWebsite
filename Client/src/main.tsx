import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/home.tsx";
import RSVP from "./pages/rsvp.tsx";
import FAQPage from "./pages/FAQ.tsx";
import UserInfoPage from "./pages/UserInfo.tsx";
import RulesPage from "./pages/RulesPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/user" element={<UserInfoPage />} /> /* TODO: Make this private to logged user only*/
          <Route path="*" element={<Home />} /> /* Catch all */
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
