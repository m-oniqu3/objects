import { CloseIcon } from "../assets/icons";

type Props = {
  onDismiss: () => void;
};

function Welcome({ onDismiss }: Props) {
  return (
    <div className="bg-zinc-50 shadow-2xs h-16 flex justify-center items-center gap-4">
      <p className="text-sm">A place for short reads — and writing them.</p>

      <button onClick={onDismiss} aria-label="Dismiss welcome banner">
        <CloseIcon className="size-4.5" />
      </button>
    </div>
  );
}

export default Welcome;
