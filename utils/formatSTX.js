export const formatSTX = (num) => {
  let p = num.toString().split('.');
  let formattedSTX = 
    p[0]
      .split('')
      .reverse()
      .reduce((acc, number, i, orig) => {
        return number + (i && !(i % 3) ? ',' : '') + acc;
      }, '')

  // if num has decimal points, add them to formatted result
  if (p[1] != undefined || p[1] != null) {
    formattedSTX += '.' + p[1]
  }

  return formattedSTX;
}