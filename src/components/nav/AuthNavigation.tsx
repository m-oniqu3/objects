import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { MenuIcon } from "../../assets/icons";
import { useAuthContext } from "../../contexts/auth/useAuth";
import { useModalContext } from "../../contexts/modal/useModal";
import { createDraft } from "../../services/drafts/create-draft";
import Button from "../Button";
import Logo from "../Logo";

function AuthNavigation() {
  const navigate = useNavigate();

  const { openModal } = useModalContext();
  const { user } = useAuthContext();
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);

  const links = ["stories", "prompts", "threads"];
  const rendered_links = links.map((link) => {
    return (
      <li key={link} className="text-sm capitalize tracking-wider ">
        <Link to={`/${link}`}>{link}</Link>
      </li>
    );
  });

  function handleModal() {
    openModal({ type: "create_prompt" });
  }

  async function handleCreateDraft() {
    try {
      setIsCreatingDraft(true);
      if (!user) return;

      const { data, error } = await createDraft();

      if (error) throw error;

      if (!data) return;

      navigate(`/draft/${data.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreatingDraft(false);
    }
  }

  return (
    <nav className="grid place-items-center h-full bg-white  top-0 left-0 w-full">
      <div className="wrapper flex items-center justify-center">
        <div className="flex items-center justify-between w-full md:hidden">
          <div className="mx-auto">
            <Logo />
          </div>

          <button className="grid place-items-center md:hidden cursor-pointer ">
            <MenuIcon className="size-5 " />
          </button>
        </div>

        <div className="hidden md:flex justify-between items-center gap-8 w-full max-w-2xl ">
          <ul className="hidden md:flex items-center gap-4">
            <Logo />

            {rendered_links}
          </ul>

          <div className="flex  items-center gap-4">
            <button
              onClick={handleModal}
              className="text-sm capitalize tracking-wide cursor-pointer"
            >
              Create
            </button>

            <Button
              onClick={handleCreateDraft}
              disabled={isCreatingDraft}
              className=" capitalize tracking-wider text-white bg-yellow-700"
            >
              {!isCreatingDraft ? "Write" : "Creating..."}
            </Button>

            <figure>
              <img
                src="https://i.pinimg.com/736x/57/47/0e/57470e092368f03796bb0d34f2527478.jpg"
                alt={"Avatar"}
                className="object-cover size-8 rounded-full"
              />
            </figure>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AuthNavigation;
