import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import AuthProvider from "./components/authProvider";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen lg:text-2xl md:text-xl text-lg">
        <div className="bg-white bg-opacity-80">
          <Header />
        </div>
        <div className="flex-grow bg-gradient-to-b from-[#f8fcf7] to-[#d4e8d1]">
          <Outlet />
        </div>
        <div className="bg-white bg-opacity-80">
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
