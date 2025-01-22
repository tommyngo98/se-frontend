export function getTime(timestamp: Date): string {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes}`;
}
