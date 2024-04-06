function SecondsToFormatedTime(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}:${seconds.toFixed(3)}`;
}
export default SecondsToFormatedTime;
