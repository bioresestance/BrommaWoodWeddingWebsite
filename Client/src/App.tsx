import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
