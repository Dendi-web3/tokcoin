export const formatNumberKMB = (num: number, fixed: number) => {
  if (num >= 1000 && num < 1000000) {
    return Math.floor(num / 1000).toFixed(fixed) + "k+";
  } else if (num >= 1000000 && num < 1000000000) {
    return Math.floor(num / 1000000).toFixed(fixed) + "m+";
  } else if (num >= 1000000000) {
    return Math.floor(num / 1000000000).toFixed(fixed) + "b+";
  }
  return num.toFixed(fixed);
};
