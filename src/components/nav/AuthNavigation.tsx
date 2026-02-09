import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { MenuIcon } from "../../assets/icons";
import { useAuth } from "../../contexts/auth/useAuth";
import { useModal } from "../../contexts/modal/useModal";
import { createDraft } from "../../services/stories/create-draft";
import { ModalTypes } from "../../types/modal";
import Button from "../Button";
import Logo from "../Logo";

function AuthNavigation() {
  const navigate = useNavigate();

  const { openModal } = useModal();
  const { user } = useAuth();
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);

  const links = ["stories", "prompts", "threads"];
  const rendered_links = links.map((link) => {
    return (
      <li key={link} className="text-sm">
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
    <nav className="grid place-items-center h-14 bg-white border-b border-gray-100 sticky top-0 left-0 w-full">
      <div className="wrapper flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />

          <ul className="hidden md:flex items-center gap-4">
            {rendered_links}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button className="grid place-items-center md:hidden cursor-pointer ">
            <MenuIcon className="size-4.5 " />
          </button>

          <div className="hidden md:flex items-center gap-4">
            <p onClick={handleModal} className="text-sm cursor-pointer">
              Create
            </p>
            <Button
              onClick={handleNewStory}
              disabled={isCreatingDraft}
              className="text-sm cursor-pointer"
            >
              Write
            </Button>
            <div className="bg-orange-700 rounded-full size-8" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AuthNavigation;
