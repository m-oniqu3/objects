import { useCallback, useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  isLoading: boolean;
  fetcher: () => void;
};

function InfiniteScroll(props: Props) {
  const { children, fetcher, isLoading } = props;

  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchFn = useCallback(() => fetcher, [fetcher]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    function callback(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchFn();
        }
      });
    }

    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchFn]);

  return (
    <div>
      {children}

      {isLoading && <p>loading.. </p>}
      <div ref={targetRef} />
    </div>
  );
}

export default InfiniteScroll;
