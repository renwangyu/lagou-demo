/**
 * const data = [
 *  { userId: 8, title: 'title1' },
 *  { userId: 11, title: 'other' },
 *  { userId: 15, title: null },
 *  { userId: 19, title: 'title2' },
 * ];
 * const result = find(data).where({
 *  'title': /\d$/,
 * }).orderBy('userId', 'desc').where({
 *  'title': /^title1$/,
 * });
 * 
 * => 返回[{ userId: 19, title: 'title2' }, { userId: 8, title: 'title1' }];
 * console.log(result.value);
 */

class Formater {
  raw = [];
  value = [];
  constructor(data) {
    this.raw = data;
    this.value = data;
  }
  where(regObj) {
    const keys = Object.keys(regObj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const reg = new RegExp(regObj[key]);
      this.value = this.value.filter(val => {
        return reg.test(val[key]);
      });
    }
    return this;
  }
  orderBy() {
    for(let key of arguments) {
      this.value.sort((a, b) => {
        if (typeof a[key] !== 'undefined' && typeof b[key] !== 'undefined') {
          return b[key] - a[key];
        }
        return 0;
      });
    }
    return this;
  }
}


function find(data) {
  return new Formater(data);
}

const data = [
  { userId: 8, title: 'title1' },
  { userId: 11, title: 'other' },
  { userId: 15, title: null },
  { userId: 19, title: 'title2' },
];
const result = find(data).where({
  'title': /\d$/,
}).orderBy('userId', 'desc')
console.log(result.value);