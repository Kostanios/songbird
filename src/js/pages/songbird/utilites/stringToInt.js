export const stringToInt = (str) => {
  if(!str){return 1};
  let arr = str.split(':');
  return parseInt(arr[0] * 60 + arr[1]);
}
