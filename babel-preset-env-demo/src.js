// import '@babel/polyfill'
import "core-js/stable";
import 'regenerator-runtime/runtime';

// https://github.com/browserslist/browserslist#queries
const arr = [0, 1, 2, [3, 4]];
arr.includes(1);
arr.flat();

function wait(ms) {
  setTimeout(() => {
    Promise.resolve();
  }, ms);
}
async function process(ms) {
  await wait(2000);
  return arr;
}

export default process;
