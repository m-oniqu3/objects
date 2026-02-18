import type { JSX, MouseEvent } from "react";
import { type IconProps } from "../assets/icons";

type Props = {
  icon: ({ className }: IconProps) => JSX.Element;
  value: number;
  onClick: () => void;
};

function Metric(props: Props) {
  const { icon, value, onClick } = props;
  const Icon = icon;

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  }
  return (
    <button
      className=" flex items-center gap-2 text-neutral-500 cursor-pointer"
      onClick={handleClick}
    >
      <Icon className="size-5" />

      <span className="text-sm text">{value}</span>
    </button>
  );
}

export default Metric;
