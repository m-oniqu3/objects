import { useState, type ChangeEvent, type SubmitEvent } from "react";
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

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
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
    <div className="panel">
      <form onSubmit={handleSubmit}>
        <header>
          <h2 className="text-lg font-semibold ">Create a prompt</h2>

          <p className="text-sm text-gray-500 ">
            Prompts are open-ended ideas for short reads.
          </p>

          {error && <p className="input-error">{error}</p>}
        </header>

        <div>
          <input
            type="text"
            placeholder="Write something that makes people think"
            value={title}
            onChange={handleInputChange}
            maxLength={140}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus: focus:ring-black"
            autoFocus
          />

          <div className="flex gap-2">
            <Button
              type="button"
              onClick={closeModal}
              className=" border border-gray-300"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className=" bg-black text-white disabled:opacity-50"
              disabled={!title.trim() || isLoading}
            >
              Publish
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePrompt;
