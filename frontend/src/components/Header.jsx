import { useAppContext } from "../contexts/AppContext";
import Logo from "./Logo";
import Nav from "./Nav";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="flex flex-wrap items-center justify-between bg-zinc-300 p-2 shadow-sm">
      <Logo />
      <Nav isLoggedIn={isLoggedIn} />
    </header>
  );
};

export default Header;
