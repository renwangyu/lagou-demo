/**
 * 处理一个数组，使其支持array[-1]的访问
 */
function proxy(arr) {
  return new Proxy(arr, {
    get(target, prop, receiver) {
      if (prop < 0) {
        prop = +prop + target.length;
      }
      return Reflect.get(target, prop, receiver);
      // return target[prop]
    }
  })
}

const arr = proxy([1, 2, 3]);
console.log(arr[-1]) // 3
console.log(arr[-2]) // 2
console.log(arr[-3]) // 1