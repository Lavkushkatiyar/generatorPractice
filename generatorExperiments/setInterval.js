const generator = function* () {
  const name = yield "name";
  const age = yield "age";
  yield `${name} ${age}`;
};
const data = generator();
data.next();
data.next("Lavkush");
setInterval(() => {
  console.log("name", "age");
}, 2000);
console.log(data.next("20"));
data.next();
