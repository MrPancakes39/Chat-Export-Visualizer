const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const fs = require("fs");
const path = require("path");

const parseWAChat = require("./parseWAChat");
const getUserValues = require("./getUserValues");
const genColorNames = require("./genColorNames");
const genOutFile = require("./genOutFile");

function smallError(msg) {
    let err = new Error(msg);
    err.stack = err.stack.split('\n').slice(0, 2).join('\n');
    return err;
}

export async function cli(args) {
    const argv = yargs(hideBin(args))
        .usage("\nUsage: wa-export <whatsapp_chat_txt_file> <output_directory_location>")
        .demandCommand(2, 2)
        .help(true)
        .argv;

    const filePath = argv._[0];
    if (path.extname(filePath) !== ".txt") {
        throw smallError("The file must be a txt file");
    }

    if (!fs.existsSync(filePath)) {
        throw smallError("The input file doesn't exist");
    }

    let waFile;
    try {
        waFile = fs.readFileSync(filePath, "utf-8");
    } catch (err) {
        throw smallError("Failed to read the txt file");
    }

    const dirPath = argv._[1];
    if (!fs.existsSync(dirPath)) {
        throw smallError("The output directory doesn't exist");
    }

    if (!fs.lstatSync(dirPath).isDirectory()) {
        throw smallError("The output path is not a directory");
    }

    const [json_data, names] = await parseWAChat(waFile);
    const userVals = await getUserValues(names);
    const colorNames = await genColorNames(names);

    if (!userVals.hasOwnProperty("chatTitle") || !userVals.hasOwnProperty("groupChat") || !userVals.hasOwnProperty("yourself")) {
        throw smallError("One or more of the prompts have missing input(s)");
    }

    let outPath;
    try {
        outPath = await genOutFile(dirPath, json_data, userVals, colorNames);
    } catch (err) {
        throw new Error("Couldn't generate html file");
    }

    console.log(`Done.\nGenerated file: ${outPath}.`);
}