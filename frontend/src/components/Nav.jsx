import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const NavElements = ({ isLoggedIn, closeNavbar }) => {
  return (
    <>
      <Link to={"/"} onClick={closeNavbar} className="hover:underline">
        Home
      </Link>
      {isLoggedIn ? (
        <>
          <Link
            to={"/bookings"}
            onClick={closeNavbar}
            className="hover:underline"
          >
            Meine Buchungen
          </Link>
          <Link
            to={"/my-gyms"}
            onClick={closeNavbar}
            className="hover:underline"
          >
            Meine Hallen
          </Link>
          <span onClick={closeNavbar}>
            <LogoutButton />
          </span>
        </>
      ) : (
        <>
          <Link
            to={"/login"}
            onClick={closeNavbar}
            className="hover:opacity-75 active:opacity-65"
          >
            Anmelden
          </Link>
        </>
      )}
    </>
  );
};

const Nav = ({ isLoggedIn, isOpen, setIsOpen, toggleNavbar, closeNavbar }) => {
  return (
    <>
      <nav>
        <div className="hidden items-center gap-5 text-xl font-semibold md:flex">
          <NavElements isLoggedIn={isLoggedIn} closeNavbar={closeNavbar} />
        </div>

        <div className="inline md:hidden">
          <button
            onClick={toggleNavbar}
            className="flex items-center justify-center"
          >
            {isOpen ? (
              <IoClose className="size-9" />
            ) : (
              <IoMenu className="size-9" />
            )}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex basis-full flex-col items-center gap-5 py-7 text-xl font-semibold">
          <NavElements isLoggedIn={isLoggedIn} closeNavbar={closeNavbar} />
        </div>
      )}
    </>
  );
};

export default Nav;
