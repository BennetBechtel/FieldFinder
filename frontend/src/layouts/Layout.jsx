import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
