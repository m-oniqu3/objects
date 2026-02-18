import parse from "html-react-parser";
import type { StoryComment as SComment } from "../../../types/story";
import { formatDate } from "../../../utils/validation/format-date";

type Props = { comment: SComment };

function StoryComment(props: Props) {
  const {
    comment: {
      content,
      author: { avatar_url, fullname },
      created_at,
    },
  } = props;

  const avatar =
    avatar_url ?? `https://ui-avatars.com/api/?name=${fullname}?rounded=true`;

  return (
    <article className="flex flex-col gap-4 py-8 border-b border-neutral-100">
      <div className="flex items-center gap-4">
        <figure>
          <img
            src={avatar}
            alt={"Avatar" + fullname}
            className="object-cover size-8 rounded-full"
          />
        </figure>

        <p className="text-xs uppercase leading-8 tracking-wider flex items-center gap-2">
          <span>{fullname}</span>
          &bull;
          <span className="lowercase text-neutral-500">
            {formatDate(created_at)}
          </span>
        </p>
      </div>

      <div className="text">{parse(content)}</div>
    </article>
  );
}

export default StoryComment;
