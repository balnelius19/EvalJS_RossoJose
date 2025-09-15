const usersHuman = [{
    type: "humain",
    name: "John Doe",
    email: "j.smith@gmail.com",
    age: 25,
    avatar: './img/john.png',
    icon: './img/john_icon.png',
    latitude: 43.604429,
    longitude: 1.443812
},
{
    type: "humain",
    name: "Jane Smith",
    email: "ja.doe@sfr.fr",
    age: 5,
    avatar: './img/jane.png',
    icon: './img/jane_icon.png',
    latitude: 43.60792,
    longitude: 1.44133
},
{
    type: "humain",
    name: "Le Vénérable",
    email: "levy@gmail.com",
    age: 500,
    avatar: './img/venerable.png',
    icon: './img/venerable_icon.png',
    latitude: 43.60053,
    longitude: 1.44590
}
];

const usersPet = [{
    type: "animal de compagnie",
    espece: "chien",
    name: "Rox",
    age: 7,
    propriétaire: "John Doe",
    avatar: './img/chien.png',
    icon: './img/chien_icon.png',
    latitude: 43.60377,
    longitude: 1.43583
},
{
    type: "animal de compagnie",
    espece: "renard",
    name: "Roukie",
    age: 300,
    propriétaire: "Le Vénérable",
    avatar: './img/renard.jpg',
    icon: './img/renard_icon.png',
    latitude: 43.59602,
    longitude: 1.43692
}
];

const usersXeno = [{
    type: "Xeno",
    espece: "Krogan",
    name: "Wrex",
    menace: "Rouge",
    age: 45,
    avatar: './img/wrex.png',
    icon: './img/wrex_icon.png',
    latitude: 43.59555,
    longitude: 1.45257
},
{
    type: "Xeno",
    espece: "Turien",
    name: "Garrus",
    menace: "Vert",
    age: 35,
    avatar: './img/garrus.png',
    icon: './img/garrus_icon.png',
    latitude: 43.61108,
    longitude: 1.45539
},
{
    type: "Xeno",
    espece: "Asari",
    name: "Liara",
    menace: "ULTRA Rouge",
    age: 25,
    avatar: './img/liara.png',
    icon: './img/liara_icon.png',
    latitude: 43.61183,
    longitude: 1.43222
}
];

const tabData = [];

const allUsers = [usersHuman, usersPet, usersXeno];
for (let i = 0; i < allUsers.length; i++) {
    tabData.push(allUsers[i]);
}


function cardHuman(objet) {
    const article = document.createElement("article");

    const h2 = document.createElement("h2");
    h2.textContent = objet.name;

    const img = document.createElement("img");
    img.src = objet.avatar;
    img.alt = "Portrait de : " + objet.name;

    const p = document.createElement("p");
    p.textContent = `${objet.age} ans – ${objet.email}`;

    article.append(h2, img, p);
    article.classList.add("card");

    return article;
}


function cardPet(objet) {
    const article = document.createElement("article");

    const h2 = document.createElement("h2");
    h2.textContent = objet.name;

    const img = document.createElement("img");
    img.src = objet.avatar;
    img.alt = "Portrait de : " + objet.name;

    const p = document.createElement("p");
    p.textContent = `${objet.age} ans – Espèce : ${objet.espece} – Propriétaire : ${objet.propriétaire}`;

    article.append(h2, img, p);
    article.classList.add("card");

    return article;
}

function cardXeno(objet) {
    const article = document.createElement("article");

    const h2 = document.createElement("h2");
    h2.textContent = objet.name;

    const img = document.createElement("img");
    img.src = objet.avatar;
    img.alt = "Portrait de : " + objet.name;

    const p = document.createElement("p");
    p.textContent = `${objet.age} ans – Espèce : ${objet.espece} – Menace : ${objet.menace}`;

    article.append(h2, img, p);
    article.classList.add("card");

    return article;
}

function profil(tab) {
    const cardList = [];

    for (let i = 0; i < tab.length; i++) {
        const objet = tab[i];

        if (objet.type === "humain") {
            cardList.push(cardHuman(objet));
        } else if (objet.type === "animal de compagnie") {
            cardList.push(cardPet(objet));
        } else if (objet.type === "Xeno") {
            cardList.push(cardXeno(objet));
        } else {
            console.error("Type de Profil non Existant");
        }
    }

    return cardList;
}


function profilAll(bigTab) {
    const sectionProfils = document.querySelector(".profils");

    for (let i = 0; i < bigTab.length; i++) {
        const smallTab = bigTab[i];
        const cardTab = profil(smallTab);

        for (let j = 0; j < cardTab.length; j++) {
            sectionProfils.appendChild(cardTab[j]);
        }
    }
}

profilAll(tabData);


const carteElement = document.getElementById('map');
carteElement.style.height = "100vh";
carteElement.style.width = "50vw";

const carte = L.map('map').setView([43.604429, 1.443812], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(carte);

carte.flyTo([43.604429, 1.443812], 14);

function markerprofil(objet) {
    const icon = L.icon({
        iconUrl: objet.icon,
        iconSize: [50, 83],
        iconAnchor: [25, 83]
    });
        L.marker([objet.latitude, objet.longitude], { icon: icon })
     .addTo(carte)
     .bindPopup(`<strong>${objet.name}</strong>`);
}

for (let i = 0; i < tabData.length; i++) {
    const group = tabData[i];
    for (let j = 0; j < group.length; j++) {
        const profil = group[j];
        markerprofil(profil);
    }
}


