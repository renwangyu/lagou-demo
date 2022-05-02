module.exports = function({ types: t }) {
  return {
    name: '删除console的babel插件',
    visitor: {
      // visitor自定义函数
      CallExpression(path, state) {
        const callee = path.get('callee');
        if(callee.isMemberExpression()) {
          if (t.isIdentifier(callee.get('object').node, { name: 'console' })) {
            const {
              opts: {
                keep = '',
              }
            } = state;

            if (keep === '') {
              path.remove();
            } else {
              const args = path.get('arguments')
              const shouldKeep = args.some(p => {
                return t.isStringLiteral(p.node, { value: keep });
              });
              !shouldKeep && path.remove();
            }
          }
        }
      },
    }
  };
};