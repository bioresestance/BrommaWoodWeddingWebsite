import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import HomePage from "./pages/home.tsx";
import RSVPPage from "./pages/rsvp.tsx";
import FAQPage from "./pages/FAQ.tsx";
import UserInfoPage from "./pages/UserInfo.tsx";
import RulesPage from "./pages/RulesPage.tsx";
import PrivateRoute from "./pages/PrivatePage.tsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicy.tsx";
import HotelsPage from "./pages/Hotels.tsx";
import VenuePage from "./pages/Venue.tsx";
import ConfirmationPage from "./pages/ConfirmationPage.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/rsvp" element={<RSVPPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/venue" element={<VenuePage />} />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <UserInfoPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/confirmation"
              element={
                <PrivateRoute>
                  <ConfirmationPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<HomePage />} /> /* Catch all */
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
