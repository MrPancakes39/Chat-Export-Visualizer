const fs = require("fs");
const chunk = require("lodash.chunk");
const waParser = require("whatsapp-chat-parser").parseString;

async function parseWAChat(inputFile, outputFile) {
    const raw_data = fs.readFileSync(inputFile, "utf-8");
    const messages = await waParser(raw_data);
    const message_pages = chunk(messages, 500);
    fs.writeFile(outputFile, JSON.stringify(message_pages), "utf-8", (err) => { if (err) return console.error(err) });
}

parseWAChat("./chats/WhatsApp Chat.txt", "./messages.json");