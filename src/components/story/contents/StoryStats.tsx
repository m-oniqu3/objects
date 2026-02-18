import {
  CommentIcon,
  HeartOutlineIcon,
  RepostIcon,
} from "../../../assets/icons";
import Metric from "../../Metric";

function StoryStats() {
  const story_stats = [
    { icon: HeartOutlineIcon, value: 345, onClick: () => {} },
    { icon: CommentIcon, value: 658, onClick: () => {} },
    { icon: RepostIcon, value: 47, onClick: () => {} },
  ];

  const rendered_stats = story_stats.map((stat, i) => {
    return (
      <Metric
        key={i}
        icon={stat.icon}
        value={stat.value}
        onClick={stat.onClick}
      />
    );
  });

  return (
    <div className="flex items-center justify-evenly gap-8 h-16 border-y  border-neutral-100">
      {rendered_stats}
    </div>
  );
}

export default StoryStats;
