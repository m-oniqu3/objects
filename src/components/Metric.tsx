import type { JSX } from "react";
import { type IconProps } from "../assets/icons";

type Props = {
  icon: ({ className }: IconProps) => JSX.Element;
  value: number;
};

function Metric(props: Props) {
  const { icon, value } = props;
  const Icon = icon;

  return (
    <div className=" flex items-center gap-2 text-neutral-500">
      <Icon className="size-4.5" />

      <span className="text-sm">{value}</span>
    </div>
  );
}

export default Metric;
