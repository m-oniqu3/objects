import parse from "html-react-parser";
import { useLocation } from "react-router";
import useSWR from "swr";
import { LoadingIcon } from "../assets/icons";
import getStory from "../services/stories/get-published-story";
import { formatDate } from "../utils/validation/format-date";

async function getStoryFetcher(storyID: string) {
  if (!storyID) throw new Error("No Story ID present");

  const { data, error } = await getStory(storyID);

  if (error) throw error;

  return data;
}

function Story() {
  const { pathname } = useLocation();
  const storyID = pathname.split("/").pop() ?? "";

  const { data, error, isLoading } = useSWR(
    "get-published-story-" + storyID,
    () => getStoryFetcher(storyID),
    { suspense: true },
  );

  if (isLoading) {
    <LoadingIcon className="size-5 animate-spin" />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>story not found</p>;
  }

  const {
    prompt,
    title,
    subtitle,
    body,
    author: { avatar_url, fullname },
    published_at,
  } = data;
  const avatar =
    avatar_url ?? `https://ui-avatars.com/api/?name=${fullname}?rounded=true`;

  return (
    <section>
      <article className="flex flex-col gap-12 max-w-2xl mx-auto">
        <header className="flex flex-col gap-8 border-b border-neutral-100 pb-8">
          {prompt && (
            <p className="text-xs uppercase leading-5 tracking-wider text-neutral-800">
              {prompt.title}
            </p>
          )}

          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold leading-5 tracking-wider text-neutral-800">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs  leading-5 tracking-wider text-neutral-800 uppercase">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <figure>
              <img
                src={avatar}
                alt={"Avatar" + fullname}
                className="object-cover size-10 rounded-full"
              />
            </figure>

            <div>
              <p className="text-xs uppercase tracking-wider font-medium">
                {fullname}
              </p>
              <p className="text-xs text-neutral-600 tracking-wider">
                {formatDate(published_at)}
              </p>
            </div>
          </div>
        </header>

        <p className="text-sm leading-8 tracking-wider text-neutral-800">
          {parse(body)}
        </p>
      </article>
    </section>
  );
}

export default Story;
