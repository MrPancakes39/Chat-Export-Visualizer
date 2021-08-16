let data;
let groupChat = true;
let yourself = "Salman Hasan";
let chatTitle = "Group Chat Title";

let nextDate = "",
    currentDate = "";

// fetches the data.
async function getData() {
    const res = await fetch("../messages.json");
    const data = await res.json();
    return data;
}

function genHeader() {
    let header = document.querySelector(".chat_head");
    header.children[0].src = (groupChat) ? "./assets/group-icon.svg" : "./assets/person-icon.svg";
    header.children[1].innerText = chatTitle;
}

// Checks if valid url.
function validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

// returns the type of message
function typeOfMsg(msg) {
    if (msg["author"] == "System") {
        if (msg["message"].includes("end-to-end encrypted"))
            return "system-message notification";
        return "system-message";
    }

    if (msg["author"] == yourself)
        return "you-message";

    return "other-message";
}

// Gets date in format "day month_name year".
function getDate(date) {
    a = moment(date).format("LL").split(" ");
    [a[0], a[1]] = [a[1].slice(0, -1), a[0]];
    return a.join(" ");
}

// Gets time in format "xx:xx am/pm".
const getTime = (date) => moment(date).format("LT").toLowerCase();

async function genMsg() {
    data = await getData();
    let parent = document.querySelector("#messages"); // Selects parent div.
    for (let i = 0; i < data.length; i++) {
        let type = typeOfMsg(data[i]);

        // parent > message-row > message-text
        let div = document.createElement("div"); // Creates a message-row container.
        if (i > 0 && type == "you-message") {
            let typeBefore = typeOfMsg(data[i - 1]);
            let typeAfter = typeOfMsg(data[i + 1]);

            type =
                (typeBefore != "you-message" && typeAfter == "you-message") ? "you-message start" :
                (typeBefore == "you-message" && typeAfter == "you-message") ? "you-message middle" :
                (typeBefore == "you-message" && typeAfter != "you-message") ? "you-message last" :
                "you-message";
        }
        div.className = `message-row ${type}`;

        let msgText = document.createElement("div"); // Creates a message-text container.
        msgText.className = "message-text";

        if (type.includes("system")) {
            msgText.innerText = data[i]["message"];
        } else {
            let msg = data[i]["message"].trim();

            /*
             *  Creates 4 containers:
             *  message-text > (author, container)
             *  container > (text, time)
             */
            let text = document.createElement("p");
            let time = document.createElement("p");
            let author = document.createElement("p");
            let container = document.createElement("div");

            text.className = "text";
            time.className = "time";
            author.className = "author";
            container.className = "container";

            time.innerText = getTime(data[i]["date"]);

            if (groupChat && type.includes("other"))
                author.innerText = data[i]["author"].trim();

            // If msg is valid url create <a> tag for it.
            if (validURL(msg)) {
                let a = document.createElement("a");
                a.href = (msg.match(/(^https?:\/\/)/g)) ? msg : `https://${msg}`;
                a.target = "_blank";
                a.innerText = msg;
                text.appendChild(a);
            } else {
                // if <Media omitted> then we emojione it.
                if (msg == "<Media omitted>") {
                    text.innerText = msg;
                } else {
                    text.innerHTML = emojione.toImage(msg);
                }
            }

            container.append(text, time);
            msgText.append(author, container);
        }

        // If date changes add a date message row.
        nextDate = getDate(data[i]["date"]);
        if (currentDate != nextDate) {
            let dateDiv = document.createElement("div");
            dateDiv.className = "message-row system-message date";

            let dateText = document.createElement("div");
            dateText.className = "message-text";

            dateText.innerText = nextDate;
            currentDate = nextDate;

            dateDiv.appendChild(dateText);
            parent.appendChild(dateDiv);
        }

        div.appendChild(msgText);
        parent.appendChild(div);
    }
}

genHeader();
genMsg();