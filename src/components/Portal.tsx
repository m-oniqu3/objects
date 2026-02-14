import { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  selector: string;
  close: () => void;
};

export default function Portal({ children, selector, close }: Props) {
  const portalElement =
    typeof document !== "undefined"
      ? (document.querySelector(selector) as HTMLElement | null)
      : null;

  useEffect(() => {
    if (!portalElement) return;

    const handleClick = (e: MouseEvent) => {
      if (!portalElement.contains(e.target as Node)) {
        close(); // ✅ called in response to user interaction
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [portalElement, close]);

  if (!portalElement) return null;

  return createPortal(children, portalElement);
}
