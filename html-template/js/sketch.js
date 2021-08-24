let nextDate = "",
    currentDate = "";

const PERSON_ICON = `
<path fill="#DFE5E7" class="background" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
<path fill="#FFF" class="primary" d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
`;
const GROUP_ICON = `
<path fill="#DFE5E7" class="background" d="M105.946.25C164.318.25 211.64 47.596 211.64 106s-47.322 105.75-105.695 105.75C47.571 211.75.25 164.404.25 106S47.571.25 105.946.25z"></path>
<path fill="#FFF" class="primary" d="M61.543 100.988c8.073 0 14.246-6.174 14.246-14.246s-6.173-14.246-14.246-14.246-14.246 6.173-14.246 14.246 6.174 14.246 14.246 14.246zm8.159 17.541a48.192 48.192 0 0 1 8.545-6.062c-4.174-2.217-9.641-3.859-16.704-3.859-21.844 0-28.492 15.67-28.492 15.67v8.073h26.181l.105-.248c.303-.713 3.164-7.151 10.365-13.574zm80.755-9.921c-6.854 0-12.21 1.543-16.336 3.661a48.223 48.223 0 0 1 8.903 6.26c7.201 6.422 10.061 12.861 10.364 13.574l.105.248h25.456v-8.073c-.001 0-6.649-15.67-28.492-15.67zm0-7.62c8.073 0 14.246-6.174 14.246-14.246s-6.173-14.246-14.246-14.246-14.246 6.173-14.246 14.246 6.173 14.246 14.246 14.246zm-44.093 3.21a23.21 23.21 0 0 0 4.464-.428c.717-.14 1.419-.315 2.106-.521 1.03-.309 2.023-.69 2.976-1.138a21.099 21.099 0 0 0 3.574-2.133 20.872 20.872 0 0 0 5.515-6.091 21.283 21.283 0 0 0 2.121-4.823 22.16 22.16 0 0 0 .706-3.193c.16-1.097.242-2.224.242-3.377s-.083-2.281-.242-3.377a22.778 22.778 0 0 0-.706-3.193 21.283 21.283 0 0 0-3.272-6.55 20.848 20.848 0 0 0-4.364-4.364 21.099 21.099 0 0 0-3.574-2.133 21.488 21.488 0 0 0-2.976-1.138 22.33 22.33 0 0 0-2.106-.521 23.202 23.202 0 0 0-4.464-.428c-12.299 0-21.705 9.405-21.705 21.704 0 12.299 9.406 21.704 21.705 21.704zM145.629 131a36.739 36.739 0 0 0-1.2-1.718 39.804 39.804 0 0 0-3.367-3.967 41.481 41.481 0 0 0-3.442-3.179 42.078 42.078 0 0 0-5.931-4.083 43.725 43.725 0 0 0-3.476-1.776c-.036-.016-.069-.034-.104-.05-5.692-2.581-12.849-4.376-21.746-4.376-8.898 0-16.055 1.795-21.746 4.376-.196.089-.379.185-.572.276a43.316 43.316 0 0 0-3.62 1.917 42.32 42.32 0 0 0-5.318 3.716 41.501 41.501 0 0 0-3.443 3.179 40.632 40.632 0 0 0-3.366 3.967c-.452.61-.851 1.186-1.2 1.718-.324.493-.6.943-.841 1.351l-.061.101a27.96 27.96 0 0 0-.622 1.119c-.325.621-.475.975-.475.975v11.692h82.53v-11.692s-.36-.842-1.158-2.195a35.417 35.417 0 0 0-.842-1.351z"></path>
`;

function genHeader() {
    let header = document.querySelector(".chat_head");
    header.children[0].innerHTML = (groupChat) ? GROUP_ICON : PERSON_ICON;
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
    try {
        return !!pattern.test(str);
    } catch (e) {
        return false;
    }
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
    let a = moment(date).format("LL").split(" ");
    [a[0], a[1]] = [a[1].slice(0, -1), a[0]];
    return a.join(" ");
}

// Gets time in format "xx:xx am/pm".
const getTime = (date) => moment(date).format("LT").toLowerCase();

const createLink = (href, innerHTML) => `<a href="${href}" target="_blank">${innerHTML}</a>`;
const createElt = (name, className, innerHTML) => `<${name} class="${className}">${innerHTML}</${name}>`;

// Creates message-row div.
function createMsg(msgObj) {
    let type = typeOfMsg(msgObj);

    let msgText_innerHTML = "";

    if (type.includes("system")) {
        msgText_innerHTML = msgObj["message"];
    } else {
        let msg = msgObj["message"].trim();

        /*
         *  Creates 4 containers:
         *  message-text > (author, container)
         *  container > (text, time)
         */
        let time = createElt("p", "time", getTime(msgObj["date"]));
        let author_innerText = (groupChat && type.includes("other")) ? msgObj["author"].trim() : "";
        let author = createElt("p", "author", author_innerText);

        if (type == "other-message")
            author = author.split(`<p class="author">`).join(`<p class="author" style="color: ${colorDict[msgObj["author"]]};">`);

        let text_innerHTML = "";

        // If msg is valid url create <a> tag for it.
        if (validURL(msg)) {
            // Checks if the URL starts with https if not add it.
            let a_href = (msg.match(/(^https?:\/\/)/g)) ? msg : `https://${msg}`;
            text_innerHTML = createLink(a_href, msg);
        } else {
            // if <Media omitted> then we don't emojione it.
            if (msg == "<Media omitted>") {
                text_innerHTML = "&lt;Media omitted&gt;";
            } else {
                text_innerHTML = emojione.toImage(msg);
            }
        }
        let text = createElt("p", "text", text_innerHTML);
        let container = createElt("div", "container", `${text}\n${time}`);
        msgText_innerHTML = `${author}\n${container}`;
    }

    // parent > message-row > message-text
    let msgText = createElt("div", "message-text", msgText_innerHTML); // Creates a message-text container.
    return createElt("div", `message-row ${type}`, msgText); // Creates a message-row container.
}

// Creates a date message-row.
function createDateMsg(msgObj) {
    // If date changes add a date message row.
    nextDate = getDate(msgObj["date"]);
    if (currentDate != nextDate) {
        let dateText = createElt("div", "message-text", nextDate);
        let dateDiv = createElt("div", "message-row system-message date", dateText);
        currentDate = nextDate;
        return dateDiv;
    }
    return null;
}

function genMsg() {
    currentDate = nextDate = "";
    let lastIndex = data[page].length - 1;
    messageContainer.innerHTML = "";
    msg_con_html = ""
    for (let i = 0; i <= lastIndex; i++) {
        // Creates message-row div.
        let div = createMsg(data[page][i]);

        // Sets style for you-message div.
        if (i > 0 && i != lastIndex && typeOfMsg(data[page][i]) == "you-message") {
            let typeBefore = typeOfMsg(data[page][i - 1]);
            let typeAfter = typeOfMsg(data[page][i + 1]);

            let type =
                (typeBefore != "you-message" && typeAfter == "you-message") ? "you-message start" :
                (typeBefore == "you-message" && typeAfter == "you-message") ? "you-message middle" :
                (typeBefore == "you-message" && typeAfter != "you-message") ? "you-message last" :
                "you-message";

            div = div.split(`<div class="message-row you-message">`).join(`<div class="message-row ${type}">`);
        }

        let dateDiv = createDateMsg(data[page][i]);
        if (dateDiv)
            msg_con_html += dateDiv;

        msg_con_html += div;
    }
    messageContainer.innerHTML = msg_con_html;
}

let page = 0;
let totalPages;

const messageContainer = document.querySelector("#messages");
const loader = document.querySelector("#loader");

const back_arrow = document.querySelector("#arrow-back");
const forward_arrow = document.querySelector("#arrow-forward");
const pageNumber = document.querySelector(".chat_head .pages>p");

const options = document.querySelector("#options");
const options_menu = document.querySelector(".options_menu");

const goFPage = options_menu.children[0].children[0];
const goLPage = options_menu.children[0].children[1];

back_arrow.addEventListener("click", () => {
    if (page > 0)
        page--;
    loadPage();
});
forward_arrow.addEventListener("click", () => {
    if (page < totalPages - 1)
        page++;
    loadPage();
});
options.addEventListener("click", () => {
    options.style.pointerEvents = "none";
    options_menu.classList.toggle("hide");
    setTimeout(() => options.style.pointerEvents = "auto", 300);
})
goFPage.addEventListener("click", () => {
    options.dispatchEvent(new Event("click"));
    if (page != 0) {
        page = 0;
        loadPage();
    }
});
goLPage.addEventListener("click", () => {
    options.dispatchEvent(new Event("click"));
    if (page != totalPages - 1) {
        page = totalPages - 1;
        loadPage();
    }
});
document.addEventListener("click", (e) => {
    if (!options_menu.contains(e.target) && e.target != options && e.target != options.children[0])
        options_menu.classList.add("hide");
});

function loadPage() {
    (() => {
        loader.style.display = "block";
        messageContainer.style.display = "none";

        // If first page disabled back_arrow.
        back_arrow.className.baseVal = (page == 0) ? "disabled" : "";

        // If last page disabled forward_arrow.
        forward_arrow.className.baseVal = (page == totalPages - 1) ? "disabled" : "";

        // Stop people from clicking on arrows when page is loading.
        back_arrow.style.pointerEvents = "none";
        forward_arrow.style.pointerEvents = "none";

        setTimeout(genMsg, 10);
    })();
    setTimeout(() => {
        loader.style.display = "none";
        messageContainer.style.display = "block";
        pageNumber.innerText = `Page: ${page+1}/${totalPages}`;

        // If first page disabled back_arrow.
        back_arrow.style.pointerEvents = (page == 0) ? "none" : "auto";

        // If last page disabled forward_arrow.
        forward_arrow.style.pointerEvents = (page == totalPages - 1) ? "" : "auto";
    }, 10);
}

genHeader();
totalPages = data.length;
if (totalPages !== 1) {
    back_arrow.style.display = "block";
    forward_arrow.style.display = "block";
    pageNumber.style.display = "block";
    options.style.display = "block";
}
loadPage();