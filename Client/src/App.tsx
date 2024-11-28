import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import AuthProvider from "./components/authProvider";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
