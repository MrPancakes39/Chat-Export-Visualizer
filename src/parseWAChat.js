const Z = require("zebras");
const chunk = require("lodash.chunk");
const waParser = require("whatsapp-chat-parser").parseString;

module.exports = async function(raw_file) {
    const messages = await waParser(raw_file);
    const message_pages = chunk(messages, 500);
    const uniqueNames = Z.pipe([
        Z.getCol("author"),
        Z.unique(),
        Z.filter(name => name !== "System")
    ])(messages);
    uniqueNames.sort();
    return [JSON.stringify(message_pages), uniqueNames];
}