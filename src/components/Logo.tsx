import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/" className="text-md font-bold">
      objects
      {/* <LogoIcon className="size-6 " /> */}
    </Link>
  );
}

export default Logo;
