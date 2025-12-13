const range = function (from, to, step = 1) {
  let i = from;
  return {
    next() {
      return i < to ? { value: (i += step), done: false } : { done: true };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};
const r = range(0, 10, 1.5);
