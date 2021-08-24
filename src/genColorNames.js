const randomColor = require("randomcolor");

module.exports = async function(names) {
    const colors = randomColor({ luminosity: "dark", count: names.length });
    const nameDict = {};
    for (let i = 0; i < names.length; i++)
        nameDict[names[i]] = colors[i];

    return JSON.stringify(nameDict);
}