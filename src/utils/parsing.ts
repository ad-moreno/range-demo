export const stringifyValue = (n: number) => {
  if ((n * 100) % 100 > 0) return n.toFixed(2);
  return n.toString();
};
