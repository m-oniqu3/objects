import { Link } from "react-router";
import { LogoIcon } from "../assets/icons";

function Logo() {
  return (
    <Link to="/" className="text-md font-medium">
      <LogoIcon className="size-8 text-neutral-800" />
    </Link>
  );
}

export default Logo;
