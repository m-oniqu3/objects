function StorySeparator() {
  const bullets = Array.from({ length: 3 }, () => {
    return "\u2022";
  });

  const rendered_bullets = bullets.map((bullet, i) => {
    return <span key={i}>{bullet}</span>;
  });

  return (
    <div className="flex items-center justify-center gap-2">
      {rendered_bullets}
    </div>
  );
}

export default StorySeparator;
