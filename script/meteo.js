//Le fichier JS pour la partie Météo
let info = document.createElement("div")
info.style.width = "200px";
info.style.height = "300px";
info.style.marginTop = "16px";
info.style.marginBottom = "16px";
info.style.border = "3px solid grey";
info.style.paddingTop = "16px";
info.style.paddingRight = "12px";
info.style.paddingBottom = "24px";
info.style.paddingLeft = "12px";

let cardMeteo = document.querySelector(".cardMeteo");
let bouton = cardMeteo.querySelector("button");
cardMeteo.appendChild(info);


function addInfo(data) {
    info.innerHTML = ""; 

    let condition = document.createElement("p");
    condition.textContent = "Condition actuelle : " + data.current_condition.condition;

    let temp = document.createElement("p");
    temp.textContent = "Température actuelle : " + data.current_condition.tmp + "°C";

    let tmax = document.createElement("p");
    tmax.textContent = "Température max aujourd'hui : " + data.fcst_day_0.tmax + "°C";

    let tmin = document.createElement("p");
    tmin.textContent = "Température min aujourd'hui : " + data.fcst_day_0.tmin + "°C";

    info.append(condition, temp, tmax, tmin);
}

function boutonStyle() {
    bouton.classList.add("button__cardMeteo");
}

bouton.addEventListener("mousedown", () => {
    bouton.style.backgroundColor = "orange";
});

document.addEventListener("mouseup", () => {
    bouton.style.backgroundColor = "";
});

async function chargerMeteo() {
    try {
        const response = await fetch("https://prevision-meteo.ch/services/json/toulouse");
        const data = await response.json();
        addInfo(data);
        boutonStyle();
    } catch (error) {
        console.error("pas de choco, pas de météo :", error);
        info.textContent = "La meteo bug.";
    }
}

bouton.addEventListener("click", chargerMeteo);
