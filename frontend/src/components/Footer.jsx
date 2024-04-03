import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-row justify-around bg-primary px-5 py-3">
      <div className="flex grow flex-col gap-1 divide-y-2 divide-gray-700 text-base font-semibold sm:grow-0 sm:flex-row sm:justify-around sm:gap-5 sm:divide-y-0 sm:text-lg">
        <Link to={"#"} className="flex justify-center py-1 hover:underline">
          Impressum
        </Link>
        <Link to={"#"} className="flex justify-center py-1 hover:underline">
          Datenschutz
        </Link>
        <Link to={"#"} className="flex justify-center py-1 hover:underline">
          FAQ & Support
        </Link>
        <Link to={"#"} className="flex justify-center py-1 hover:underline">
          Über uns
        </Link>
      </div>
    </div>
  );
};

export default Footer;
