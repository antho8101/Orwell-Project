const META = {
  splash: {
    title: "Arrivée",
    meta: "Création d’identité locale — aucun compte central.",
  },
  identity: {
    title: "Identité",
    meta: "Paire de clés générée sur l’appareil. Pseudonyme purement local.",
  },
  recovery: {
    title: "Phrase de secours",
    meta: "Seule porte de récupération. À noter hors ligne.",
  },
  survival: {
    title: "Survie",
    meta: "Éphémère par défaut + Dead man’s switch avant la première ligne.",
  },
  inbox: {
    title: "Boîte vide",
    meta: "Pas de recherche d’utilisateurs — seulement des laissez-passer.",
  },
  invite: {
    title: "Laissez-passer",
    meta: "QR / lien one-shot. Alice initie la paire de files aveugles.",
  },
  accept: {
    title: "Acceptation (Bob)",
    meta: "Vérification d’empreinte (TOFU) puis création des deux files.",
  },
  chat: {
    title: "Conversation",
    meta: "Blobs via relais · E2E · compteur éphémère visible.",
  },
  ephemeral: {
    title: "Éphémère",
    meta: "Fenêtre / timer atteint → purge locale + signal d’effacement.",
  },
  dms: {
    title: "Dead man’s switch",
    meta: "Sortie volontaire. Ctrl×2 puis confirmation — pas un détecteur magique.",
  },
  wiped: {
    title: "Après wipe",
    meta: "Butin local réduit. Coffre leurre / recovery hors bande.",
  },
  square: {
    title: "Place publique",
    meta: "Tribune + vidéo. DM uniquement sur demande / invitation.",
  },
};

const phone = document.getElementById("phone");
const titleEl = document.getElementById("screen-title");
const metaEl = document.getElementById("screen-meta");
const stepButtons = [...document.querySelectorAll("[data-go]")];
const railButtons = [...document.querySelectorAll(".steps [data-go]")];

let enterCount = 0;
let ctrlCount = 0;
let ctrlTimer = null;

function go(name) {
  if (!META[name]) return;

  phone.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === name);
  });

  railButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.go === name);
  });

  titleEl.textContent = META[name].title;
  metaEl.textContent = META[name].meta;

  history.replaceState(null, "", `#${name}`);
  enterCount = 0;
}

stepButtons.forEach((btn) => {
  btn.addEventListener("click", () => go(btn.dataset.go));
});

window.addEventListener("keydown", (event) => {
  const active = phone.querySelector(".screen.is-active")?.dataset.screen;

  if (event.key === "Control") {
    ctrlCount += 1;
    clearTimeout(ctrlTimer);
    ctrlTimer = setTimeout(() => {
      ctrlCount = 0;
    }, 600);
    if (ctrlCount >= 2 && active !== "dms" && active !== "wiped" && active !== "splash") {
      ctrlCount = 0;
      go("dms");
    }
    return;
  }

  if (active === "dms" && event.key === "Enter") {
    enterCount += 1;
    if (enterCount >= 2) {
      enterCount = 0;
      go("wiped");
    }
  } else {
    enterCount = 0;
  }
});

const initial = location.hash.replace("#", "") || "splash";
go(META[initial] ? initial : "splash");
