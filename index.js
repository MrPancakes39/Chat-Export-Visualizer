const fs = require("fs");
const waParser = require("whatsapp-chat-parser").parseString;

async function parseWAChat(inputFile, outputFile) {
    const raw_data = fs.readFileSync(inputFile, "utf-8");
    const messages = await waParser(raw_data);
    fs.writeFile(outputFile, JSON.stringify(messages), "utf-8", (err) => { if (err) return console.error(err) });
}

parseWAChat("./WhatsApp Chat.txt", "./messages.json");