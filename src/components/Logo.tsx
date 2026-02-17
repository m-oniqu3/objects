import { Link } from "react-router";
import { LogoIcon } from "../assets/icons";

function Logo() {
  return (
    <Link to="/" className="text-md font-medium">
      <LogoIcon className="size-6 " />
    </Link>
  );
}

export default Logo;
