import { useAppContext } from "../contexts/AppContext";
import { useState } from "react";
import Logo from "./Logo";
import Nav from "./Nav";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 flex flex-wrap items-center justify-between bg-zinc-300 p-2 shadow-sm">
      <Logo closeNavbar={closeNavbar} />
      <Nav
        isLoggedIn={isLoggedIn}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleNavbar={toggleNavbar}
        closeNavbar={closeNavbar}
      />
    </header>
  );
};

export default Header;
