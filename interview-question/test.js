// const id = Symbol.for('id');
// const obj = {
//   name: 'bb',
//   sex: 'male',
//   id: 'abcde',
//   [id]: 12345
// }
// console.log(Object.getOwnPropertySymbols(obj))

// obj[Symbol.iterator] = function*() {
//   for (let key in this) {
//     yield this[key];
//   }
// }
// // console.log(obj.id);
// // console.log(obj[id]);

// // for(let key in obj) {
// //   console.log(key, ':', obj[key]);
// // }

// for(let val of obj) {
//   console.log(val)
// }

// var myMap = new Map();
// myMap.set("0", "foo");
// myMap.set(1, "bar");
// myMap.set({}, "baz");

// var mapIter = myMap.values();
// let iter = mapIter.next()

// while(!iter.done) {
//   console.log(iter.value);
//   iter = mapIter.next();
// }

// console.log(mapIter.next().value); // "foo"
// console.log(mapIter.next().value); // "bar"
// console.log(mapIter.next().value); // "baz"

// let user = {
//   _name: "Guest",
//   get name() {
//     return this._name;
//   }
// };

// let userProxy = new Proxy(user, {
//   get(target, prop, receiver) {
//     return Reflect.get(target, prop, receiver); // this指向admin
//     // return target[prop]; // this指向user
//   }
// });

// let admin = {
//   __proto__: userProxy,
//   _name: "Admin"
// };

// console.log('userProxy.name: ', userProxy.name);
// console.log('admin.name: ', admin.name);
