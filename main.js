

setInterval(() => {
    const textChange = document.getElementById("changeTextHome");
    if (textChange == null || textChange == undefined)
        return;

    var random = randomChoice[Math.floor(Math.random() * randomChoice.length)];
    textChange.innerHTML = random;
}, 5000);

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('copy', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('cut', (e) => {
    e.preventDefault();
    e.stopPropagation();
});


// Grazie >> https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
const checkMail = (mail) => {
    return String(mail).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const sendWebhook = (discordLink, content) => {
    var http = new XMLHttpRequest();
    http.open('POST', discordLink, true);
    http.setRequestHeader('Content-type', 'application/json');

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText + " Si prega di contattare un amministratore inviandogli un'immagine di questa notifica.");
        }
    };
    http.send(JSON.stringify(content));
};

const getTime = () => {
    let today = new Date();
    let date = `${today.getDate()}/${(today.getMonth() + 1)}${(() => (today.getMonth() + 1) < 10 ? "0" : "")()} / ${today.getFullYear()}`;
    let time = today.getHours() + " ore " + today.getMinutes() + " minuti";
    return '・ ' + date + ' - ' + time + ' ・';
};

const forms = {
    discord: null,
    email: null,
    dob: null,
    year: null,
    disponibility: null,
    hourgame: null,
    servergame: null,
    nameRP: null,
    dobRP: null,
    typeRP: null,
    RPBackground: null
};

const webStorage = (Object) => {
    if (Object.type == "get") {
        return localStorage.getItem(Object.name);
    } else if (Object.type == "set") {
        localStorage.setItem(Object.name, Object.value);
    }
};

firstStepVerification = () => {
    const discord = document.getElementById("discord-result").value || "no";
    const email = document.getElementById("email-result").value || "no";
    const dob = document.getElementById("dob-result").value || "no";
    const year = document.getElementById("year-result").value || "no";
    const disponibility = document.getElementById("disponibility-result").value || "no";

    console.log(discord, email, dob, year, disponibility);

    if (discord == "no")
        return alert("FM\nSi prega di inserire il tuo nome utente Discord");

    if (!checkMail(email))
        return alert("InvictusRP\nSi prega di inserire un indirizzo email nel formato corretto");

    if (dob == "no" || dob == "2002-09-02")
        return alert("InvictusRP\nSi prega di inserire la tua data di nascita");

    if (year == "no")
        return alert("InvictusRP\nSi prega di inserire la tua età");

    if (disponibility == "no" || disponibility == "Disponibilità") {
        return alert("InvictusRP\nSi prega di inserire la tua disponibilità");
    }

    webStorage({ type: "set", name: "discord", value: discord });
    webStorage({ type: "set", name: "email", value: email });
    webStorage({ type: "set", name: "dob", value: dob });
    webStorage({ type: "set", name: "year", value: year });
    webStorage({ type: "set", name: "disponibility", value: disponibility });

    alert("InvictusRP\nRegistrazione effettuata con successo.\nVerrai reindirizzato all'ultimo passaggio della candidatura");
    window.location.replace("candidature2.html");
};

twoStepVerification = () => {
    const hourgame = document.getElementById("hourgame-result").value || "no";
    const servergame = document.getElementById("servergame-result").value || "no";
    const nameRP = document.getElementById("nameLast-result").value || "no";
    const dobRP = document.getElementById("dobrp-result").value || "no";
    const typeRP = document.getElementById("rpWant-result").value || "no";
    const RPBackground = document.getElementById("backgroundRP").value || "no";

    if (hourgame == "no")
        return alert("InvictusRP\nSi prega di inserire le tue ore di gioco su FiveM");

    if (servergame == "no")
        return alert("InvictusRP\nSi prega di inserire i server su cui hai giocato");

    if (nameRP == "no")
        return alert("InvictusRP\nSi prega di inserire il tuo nome e cognome RP");

    if (dobRP == "no")
        return alert("InvictusRP\nSi prega di inserire la tua data di nascita RP");

    if (typeRP == "no") {
        return alert("InvictusRP\nSi prega di inserire il tipo di RP che desideri fare");
    }

    if (RPBackground == "no")
        return alert("InvictusRP\nSi prega di inserire il link al tuo background (Storia del tuo personaggio)");

    forms.hourgame = hourgame;
    forms.servergame = servergame;
    forms.nameRP = nameRP;
    forms.dobRP = dobRP;
    forms.typeRP = typeRP;
    forms.RPBackground = RPBackground;
    forms.discord = webStorage({ type: "get", name: "discord" });
    forms.email = webStorage({ type: "get", name: "email" });
    forms.dob = webStorage({ type: "get", name: "dob" });
    forms.year = webStorage({ type: "get", name: "year" });
    forms.disponibility = webStorage({ type: "get", name: "disponibility" });

    setTimeout(() => {
        sendWebhook("https://discord.com/api/webhooks/1129772268508168212/WnhrZscUSlt0TgOesbk35Sq-nWI1z1ZFoi2QMZaemJfnkQuD3REYbza4r1bo8_C7G1MW", {
            "content": ` Nuova candidatura da ${forms.discord}`,
            "embeds": [
                {
                    "title": "Nuova Candidatura Staff",
                    "description": `**__Informazioni IRL__**\n\n**Discord:** ${forms.discord}\n**Email:** ${forms.email}\n**Data di nascita:** ${forms.dob}\n**Età:** ${forms.year}\n**Disponibilità:** ${forms.disponibility}\n\n**__Informazioni RolePlay__**\n\n**Ore di Gioco (FiveM):** ${forms.hourgame}\n**Ha Avuto altre esperienze:** ${forms.servergame}\n**Nome e Cognome RP:** ${forms.nameRP}\n**Data di nascita RP:** ${forms.dobRP}\n**è consapevole in caso di messa in prova di doversi occupare per lo più del ruolo di staffer e quindi mettere da parte il suo roleplay?:** ${forms.typeRP}\n**Profilo Steam:** ${forms.RPBackground}`,
                    "color": 16546565,
                    "author": {
                        "name": "InvictusRP",
                        "url": "https://InvictusRP.fr",
                        "icon_url": "https://i.imgur.com/FYbzhSQ.png"
                    },
                    "footer": {
                        "text": getTime(),
                        "icon_url": null
                    },
                    "thumbnail": {
                        "url": "https://i.imgur.com/FYbzhSQ.png"
                    }
                }
            ]
        });
        alert("InvictusRP\nHai inviato il modulo allo staff.\nVerrai ricontattato tramite l'applicazione Discord in caso di esito positivo");
        window.location.replace("../home.html");
    }, 500);
};
