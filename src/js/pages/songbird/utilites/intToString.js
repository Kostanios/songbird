export const intToString = (int) => {
  let minute = parseInt(int/60);
  let seconds = int - 60*minute;
  return `${minute}:${seconds}`;
}