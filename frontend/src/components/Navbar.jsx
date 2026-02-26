import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-blue-600 px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">
          Multi Store Dashboard
        </h1>
        <nav>
          <Link
            to={"/change-discount"}
            className="border p-1 rounded cursor-pointer px-2 "
          >
            Label
          </Link>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
