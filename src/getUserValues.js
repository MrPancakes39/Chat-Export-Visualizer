const prompts = require("prompts");

module.exports = async function(names) {
    const chatTitle = await prompts({
        type: "text",
        name: "chatTitle",
        message: "What's the chat's title?: "
    });

    const groupChat = await prompts({
        type: "confirm",
        name: "groupChat",
        message: "Is this a group chat?: ",
        format: groupChat => groupChat ? "true" : "false"
    });

    let choices = [];
    names.forEach(name => choices.push({ title: name, value: name }));
    choices.push({ title: "Other", description: "If your name or number isn't part of the list select this option", value: "Other" });

    const yourself = await prompts({
        type: "select",
        name: "yourself",
        message: "Which author are you?: ",
        choices
    });

    if (yourself["yourself"] == "Other") {
        const temp = await prompts({
            type: "text",
            name: "yourself",
            message: "What's your name?: "
        });
        yourself["yourself"] = temp["yourself"];
    }

    return { ...chatTitle, ...groupChat, ...yourself };
}