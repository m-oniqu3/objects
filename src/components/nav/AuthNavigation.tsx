import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { MenuIcon } from "../../assets/icons";
import { useAuthContext } from "../../contexts/auth/useAuth";
import { useModal } from "../../contexts/modal/useModal";
import { createDraft } from "../../services/stories/create-draft";
import { ModalTypes } from "../../types/modal";
import Logo from "../Logo";

function AuthNavigation() {
  const navigate = useNavigate();

  const { openModal } = useModal();
  const { user } = useAuthContext();
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);

  const links = ["stories", "prompts", "threads"];
  const rendered_links = links.map((link) => {
    return (
      <li key={link} className="text-xs uppercase tracking-wider font-medium">
        <Link to={`/${link}`}>{link}</Link>
      </li>
    );
  });

  function handleModal() {
    openModal(ModalTypes.CREATE_PROMPT_MODAL);
  }

  async function handleNewStory() {
    try {
      setIsCreatingDraft(true);
      if (!user) return;

      const { data, error } = await createDraft();

      if (error) throw error;

      if (!data) return;

      navigate(`/s/${data.id}/edit`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreatingDraft(false);
    }
  }

  return (
    <nav className="grid place-items-center h-16 bg-white/50 backdrop-blur-2xl sticky top-0 left-0 w-full">
      <div className="wrapper flex items-center justify-center">
        <div className="flex items-center justify-between gap-8 w-full md:hidden">
          <div className="mx-auto">
            <Logo />
          </div>

          <button className="grid place-items-center md:hidden cursor-pointer ">
            <MenuIcon className="size-5 " />
          </button>
        </div>

        <div className="hidden md:flex justify-between items-center gap-8 w-full max-w-2xl ">
          <ul className="hidden md:flex items-center gap-4">
            {rendered_links}
          </ul>

          <Logo />

          <div className="flex justify-evenly items-center gap-4">
            <button
              onClick={handleModal}
              className="text-xs uppercase tracking-wide cursor-pointer font-medium"
            >
              explore
            </button>
            <button
              onClick={handleModal}
              className="text-xs uppercase tracking-wide cursor-pointer font-medium"
            >
              Create
            </button>

            <button
              onClick={handleNewStory}
              disabled={isCreatingDraft}
              className="text-xs uppercase tracking-wide cursor-pointer font-medium"
            >
              Write
            </button>
            <div className="bg-neutral-300 rounded-full size-8" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AuthNavigation;
