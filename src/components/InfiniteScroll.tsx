import { useCallback, useEffect, useRef } from "react";
import { LoadingIcon } from "../assets/icons";

interface InfiniteScrollProps {
  children: React.ReactNode;
  isLoading: boolean;
  canStopFetching: boolean;
  fetcher: () => void;
}

function InfiniteScroll({
  children,
  isLoading,
  canStopFetching,
  fetcher,
}: InfiniteScrollProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchFn = useCallback(() => {
    fetcher();
  }, [fetcher]);

  useEffect(() => {
    // Don't set up observer if we should stop fetching
    if (canStopFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // When the sentinel element is visible and we're not already loading
        if (entries[0].isIntersecting && !isLoading) {
          fetchFn();
        }
      },
      { threshold: 0.1 }, // Trigger when 10% visible
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [canStopFetching, isLoading, fetchFn]);

  return (
    <>
      {children}

      {/* Sentinel element that triggers loading */}
      {!canStopFetching && (
        <div ref={observerTarget} className="h-20 grid place-items-center">
          {isLoading && <LoadingIcon className="size-6 animate-spin" />}
        </div>
      )}

      {/* {canStopFetching && (
        <p className="text-center text-sm text-neutral-500 py-4">
          No more prompts
        </p>
      )} */}
    </>
  );
}

export default InfiniteScroll;
