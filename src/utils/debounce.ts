/* eslint-disable @typescript-eslint/no-explicit-any */

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args); // This was fn(...args) but args is already an array
    }, delay);
  };
}

export default debounce;
