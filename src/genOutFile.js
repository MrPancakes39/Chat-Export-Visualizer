const fs = require("fs");
const path = require("path");

String.prototype.replaceText = function(orgText, repText) {
    return this.toString().split(orgText).join(repText);
}

module.exports = async function(dirPath, json_messages, userInput, colorDict) {
    const templatePath = path.join(__dirname, "template.html");
    const outputPath = path.join(dirPath, `${userInput["chatTitle"]}.html`);

    let outputFile = fs.readFileSync(templatePath, "utf-8");
    outputFile = outputFile
        .replaceText("let data;", `let data = ${json_messages};`)
        .replaceText("let groupChat = true;", `let groupChat = ${userInput["groupChat"]};`)
        .replaceText(`let yourself = "Salman Hasan";`, `let yourself = "${userInput["yourself"]}";`)
        .replaceText(`let chatTitle = "Group Chat Title";`, `let chatTitle = "${userInput["chatTitle"]}";`)
        .replaceText(`let colorDict = JSON.parse({});`, `let colorDict = JSON.parse(\`${colorDict}\`);`);

    fs.writeFileSync(outputPath, outputFile);
    return outputPath;
};