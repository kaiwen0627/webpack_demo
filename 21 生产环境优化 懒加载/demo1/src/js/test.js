export const add = function (...params) {
  return params.reduce((p, c) => p + c, 0);
};

export const desc = function (a, b) {
  return a - b;
};
