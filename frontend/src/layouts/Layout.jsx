import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto mb-5 flex w-full max-w-[1900px] grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
