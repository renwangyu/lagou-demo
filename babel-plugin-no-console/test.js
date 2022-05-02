const fs = require('fs');
const path = require('path');
const { transformSync } = require('@babel/core');

function getCode() {
  const codeFile = path.join(__dirname, 'code.js');
  const code = fs.readFileSync(codeFile).toString();
  return code;
}

const code = getCode();
const result = transformSync(code, {
  plugins: [
    [
      './src/index.js',
      {
        "keep": "save"
      }
    ]
  ]
});
console.log(result.code);