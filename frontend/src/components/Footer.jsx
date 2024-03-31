import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-primary flex flex-row justify-around px-5 py-3">
      <div className="grow sm:grow-0 flex flex-col sm:flex-row sm:justify-around gap-1 sm:gap-5 divide-y-2 sm:divide-y-0 divide-gray-700 text-lg font-semibold">
        <Link className="flex justify-center py-1 hover:underline">
          Impressum
        </Link>
        <Link className="flex justify-center py-1 hover:underline">
          Datenschutz
        </Link>
        <Link className="flex justify-center py-1 hover:underline">
          FAQ & Support
        </Link>
        <Link className="flex justify-center py-1 hover:underline">
          Über uns
        </Link>
      </div>
    </div>
  );
};

export default Footer;
