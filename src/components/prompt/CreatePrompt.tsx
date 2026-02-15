import { useState, type ChangeEvent } from "react";
import { useAuthContext } from "../../contexts/auth/useAuth";
import { useModal } from "../../contexts/modal/useModal";
import { createPrompt } from "../../services/prompts/create-prompt";
import Button from "../Button";

function CreatePrompt() {
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthContext();

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setTitle(e.target.value);
  }

  async function handleSubmit() {
    try {
      setIsLoading(true);

      if (!title.trim() || !user?.id) return;

      const { error } = await createPrompt({ title, userID: user.id });

      if (error) throw error;

      setTitle("");
      closeModal();
    } catch (error) {
      setError(error as unknown as string);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full mx-auto md:rounded-2xl bg-white h-screen  max-w-125 md:max-h-50 md:border border-neutral-200 overflow-hidden">
      <form className="flex flex-col md:h-full">
        <header className="flex items-center  p-4 md:border-b border-neutral-200">
          <button className="text-sm" onClick={closeModal}>
            Cancel
          </button>
          <h2 className="text-lg font-semibold mx-auto ">Create a prompt</h2>

          {error && <p className="input-error">{error}</p>}
        </header>

        <div className="p-4 flex flex-col gap-4 h-full">
          <input
            type="text"
            placeholder="Write something that makes people think"
            value={title}
            onChange={handleInputChange}
            maxLength={140}
            className="w-full  text-sm outline-none "
            autoFocus
          />

          <Button
            type="submit"
            className="w-fit ml-auto mt-auto  bg-neutral-800 text-white disabled:opacity-50"
            disabled={!title.trim() || isLoading}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePrompt;
