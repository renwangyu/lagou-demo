"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const menus = [
    '韩国料理',
    '小龙虾',
    '烧烤烤串',
    '火锅',
    '日料',
    '粤菜',
    '酸菜鱼',
    '牛排',
    '披萨',
    '创意菜'
];
function randomDinner(num = 9) {
    let max = menus.length;
    if (num >= max) {
        num = max - 1;
    }
    const index = Math.floor(Math.random() * (num - 0 + 1));
    return menus[index];
}
var DINNER_TYPE;
(function (DINNER_TYPE) {
    DINNER_TYPE["SINGLE"] = "\u5355\u8EAB\u72D7";
    DINNER_TYPE["COUPLE"] = "\u548C\u5BF9\u8C61";
})(DINNER_TYPE || (DINNER_TYPE = {}));
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "what-is-for-dinner" is now active!');
    vscode.window.showInputBox();
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('what-is-for-dinner.myDinner', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('一个人还是和TA共进晚餐？', { modal: true }, ...[DINNER_TYPE.SINGLE, DINNER_TYPE.COUPLE])
            .then(val => {
            if (val === DINNER_TYPE.SINGLE) {
                vscode.window.showErrorMessage('一个人还纠结啥，随便吃点外卖，还不继续加班！');
            }
            if (val === DINNER_TYPE.COUPLE) {
                const dinner = randomDinner();
                vscode.window.showInformationMessage(`太棒了~今晚要不吃 ${dinner} ?`, ...['好嘞，去看看'])
                    .then(val => {
                    if (val === '好嘞，去看看') {
                        vscode.env.openExternal(vscode.Uri.parse(`https://www.dianping.com/search/keyword/1/0_${dinner}`));
                    }
                });
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map