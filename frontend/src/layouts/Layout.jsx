import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex grow  px-3 sm:px-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
