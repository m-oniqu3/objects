import {
  AddIcon,
  ChevronLeftIcon,
  HorizontalEllipsisIcon,
} from "../assets/icons";
import Button from "../components/Button";
import Logo from "../components/Logo";

function NewStory() {
  return (
    <div>
      <nav className="h-14 ">
        <div className="wrapper h-full flex items-center justify-between ">
          <div className="flex items-center gap-4">
            <ChevronLeftIcon className="size-4.5" />
            <Logo />

            <div className="flex items-center  gap-2">
              <p className="text-sm">Draft</p>
              <p className="text-sm">Saved</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button>
              <HorizontalEllipsisIcon className="size-5" />
            </Button>

            <Button className="hidden text-sm">
              <AddIcon className="size-4" />
              Add Prompt
            </Button>

            <Button className="text-sm ">Publish</Button>
            <div className="hidden bg-orange-700 rounded-full size-8" />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NewStory;
