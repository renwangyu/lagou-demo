/**
 * const range = {
 *  from: 1,
 *  to: 5,
 * }
 * 
 * 希望 for...of 这样运行：
 * for(let num of range) ... num = 1,2,3,4,5
 */
const range = {
  from: 1,
  to: 5,
}
// range[Symbol.iterator] = function*() {
//   for (let i = this.from; i <= this.to; i++) {
//     yield i;
//   }
// }

range[Symbol.iterator] = function() {
  return {
    current: this.from,
    last: this.to,

    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
}
for (let num of range) {
  console.log(num)
}
