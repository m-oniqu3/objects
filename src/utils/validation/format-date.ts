export function formatDate(date: string | Date): string {
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
    style: "short",
  });
  const now = new Date();
  const then = new Date(date);

  const diffInSeconds = Math.floor((then.getTime() - now.getTime()) / 1000);

  const absSeconds = Math.abs(diffInSeconds);
  if (absSeconds < 60) return rtf.format(diffInSeconds, "second");

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (Math.abs(diffInMinutes) < 60) return rtf.format(diffInMinutes, "minute");

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (Math.abs(diffInHours) < 24) return rtf.format(diffInHours, "hour");

  const diffInDays = Math.floor(diffInHours / 24);
  if (Math.abs(diffInDays) < 7) return rtf.format(diffInDays, "day");

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (Math.abs(diffInWeeks) < 4) return rtf.format(diffInWeeks, "week");

  const diffInMonths = Math.floor(diffInDays / 30);
  if (Math.abs(diffInMonths) < 12) return rtf.format(diffInMonths, "month");

  const diffInYears = Math.floor(diffInDays / 365);
  return rtf.format(diffInYears, "year");
}
