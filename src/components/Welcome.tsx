import { CloseIcon } from "../assets/icons";

type Props = {
  onDismiss: () => void;
};

function Welcome({ onDismiss }: Props) {
  return (
    <div className="bg-neutral-100 h-12 w-full fle">
      <div className="wrapper  h-full flex justify-center items-center gap-4">
        <p className="text-sm">A place for short reads — and writing them.</p>

        <button
          onClick={onDismiss}
          aria-label="Dismiss welcome banner"
          className="flex justify-center items-center"
        >
          <CloseIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

export default Welcome;
