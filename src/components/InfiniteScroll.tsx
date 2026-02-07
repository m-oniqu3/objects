import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  isLoading: boolean;
  hasMore: boolean;
  fetcher: () => void;
};

function InfiniteScroll(props: Props) {
  const { children, fetcher, isLoading, hasMore } = props;

  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    function callback(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoading && hasMore) {
          console.log("intersecting - fetching more");
          fetcher();
        }
      });
    }

    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetcher, isLoading, hasMore]);

  return (
    <div>
      {children}

      <div ref={targetRef} className="h-20 grid place-items-center">
        {isLoading && <p>loading.. </p>}
        {!hasMore && !isLoading && <p>No more stories</p>}
      </div>
    </div>
  );
}

export default InfiniteScroll;
