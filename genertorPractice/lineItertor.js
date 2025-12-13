const lineIterator = (text) => {
  let index = 0;
  return {
    next() {
      const endLineIndex = text.indexOf("\n", index);
      if (index === text.length) {
        return { done: true };
      }
      if (endLineIndex === -1) {
        const lastLine = text.slice(index);
        index = text.length;
        return { value: lastLine, done: false };
      }
      const line = text.slice(index, endLineIndex);
      index = endLineIndex + 1;
      return { value: line, done: false };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};
