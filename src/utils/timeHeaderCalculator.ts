function TimeHeaderCalculator(prevDate: any, finalDate: any) {
  const diferenca = prevDate.getTime() - finalDate.getTime();

  const allSeconds = diferenca / 1000;

  const day = Math.floor(allSeconds / (3600 * 24));
  const hours = Math.floor((allSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((allSeconds % 3600) / 60);
  const seconds = Math.floor(allSeconds % 60);

  return {
    day,
    hours,
    minutes,
    seconds,
  };
}
export default TimeHeaderCalculator;
