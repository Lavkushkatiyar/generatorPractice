// - Generate sequences of consecutive pairs
//   [1,2,3,4,5] => [[1,2],[2,3],[3,4],[4,5]]
const sequences = function* (arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    yield [arr[i], arr[i + 1]];
  }
};
const oneRepeatChunk = Iterator.from(sequences([1, 2, 3, 4, 5]));
[...oneRepeatChunk];

// - Generate all pair permutations
//   [1,2,3,4,5] => [[1,2],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5],...]

const perm = function* (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] === arr[j]) continue;
      yield [arr[i], arr[j]];
    }
  }
};
const permutations = Iterator.from(perm([1, 2, 3, 4, 5]));
[...permutations];

// - Generate a cycle of elements
//   [1,2,3,4,5] => [1,2,3,4,5,1,2,3,4,5,...]

const cyclic = function* (arr) {
  let i = 0;
  while (true) {
    yield arr[i];
    i = (i + 1) % arr.length;
  }
};

const cyclicSequence = cyclic([1, 2, 3, 4, 5]);
let count = 0;
for (const x of cyclicSequence) {
  console.log(x);
  if (++count === 10) break;
}

// - partition by
//   identity: [1,1,1,2,2,1,1,3,3,2] => [[1,1,1],[2,2],[1,1],[3,3],[2]]
//   isEven: [1,3,1,2,2,1,1,3,5,2] => [[1,3,1],[2,2],[1,1,3,5],[2]]
// - Prime number series
const identity = function* (arr) {
  let group = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      group.push(arr[i]);
    } else {
      yield group;
      group = [arr[i]];
    }
  }
  yield group;
};
const identityArray = identity([1, 1, 1, 2, 2, 1, 1, 3, 3, 2]);
[...identityArray];

//   isEven: [1,3,1,2,2,1,1,3,5,2] => [[1,3,1],[2,2],[1,1,3,5],[2]]
const evenSeries = function* (arr) {
  let group = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] % 2 === arr[i - 1] % 2) {
      group.push(arr[i]);
    } else {
      yield group;
      group = [arr[i]];
    }
  }
  yield group;
};
const even = evenSeries([1, 3, 1, 2, 2, 1, 1, 3, 5, 2]);
[...even];

// - Flipped consecutive elements
//   [1,2,3,4] => [2,1,4,3];
// - chunk
//   2: [1,2,3,4] => [[1,2],[3,4]];
//   3,1: [1,2,3,4,5] => [[1,2,3],[3,4,5]];
//   3,2: [1,2,3,4,5] => [[1,2,3],[2,3,4],[3,4,5]];

function* flipPairs(arr) {
  for (let i = 0; i < arr.length; i += 2) {
    const a = arr[i];
    const b = arr[i + 1];
    yield b;
    yield a;
  }
}
[...flipPairs([1, 2, 3, 4])];

//   2: [1,2,3,4] => [[1,2],[3,4]];
//   3,1: [1,2,3,4,5] => [[1,2,3],[3,4,5]];
//   3,2: [1,2,3,4,5] => [[1,2,3],[2,3,4],[3,4,5]];
const chunkBy = (size, step) => {
  return function* (arr) {
    for (let i = 0; i + size <= arr.length; i += size - step) {
      yield arr.slice(i, i + size);
    }
  };
};
// - iterate(f,x) => f(x), f(f(x)), f(f(f(x)))

function* iterate(f, x) {
  let current = f(x);
  while (true) {
    yield current;
    current = f(current);
  }
}
