const META = {
  splash: {
    title: "Welcome",
    meta: "Private letters. Your papers stay on your machine.",
  },
  identity: {
    title: "Papers",
    meta: "No phone book entry — just a seal and a cover name.",
  },
  recovery: {
    title: "Passport",
    meta: "Words on paper. The only way back to your desk.",
  },
  settings: {
    title: "Settings",
    meta: "Burn after reading, Dead man’s switch, cover story.",
  },
  inbox: {
    title: "Empty desk",
    meta: "No phone book. Hand out a safe-conduct to begin.",
  },
  invite: {
    title: "Safe-conduct",
    meta: "Once only. Show it in person — or pass it quietly.",
  },
  accept: {
    title: "Accept (Bob)",
    meta: "Check the seal in real life, then open the letter line.",
  },
  chat: {
    title: "Letters",
    meta: "Sealed letters. Burn after reading. No jargon on the desk.",
  },
  ephemeral: {
    title: "Burn after reading",
    meta: "The pile is gone from both desks.",
  },
  dms: {
    title: "Dead man’s switch",
    meta: "Burn the desk in a hurry. Ctrl×2, then Enter×2.",
  },
  wiped: {
    title: "After the burn",
    meta: "Cover story showing. Papers and letters: ash.",
  },
  square: {
    title: "Public Square (web)",
    meta: "Speak in the open. Private letters stay in Courier.",
  },
};

const app = document.getElementById("app");
const web = document.getElementById("web");
const threadList = document.getElementById("thread-list");
const titleEl = document.getElementById("screen-title");
const metaEl = document.getElementById("screen-meta");
const body = document.body;

const railButtons = [...document.querySelectorAll(".steps [data-go]")];
const navItems = [...document.querySelectorAll("[data-nav]")];

let enterCount = 0;
let ctrlCount = 0;
let ctrlTimer = null;

function renderList(kind) {
  const template = document.getElementById(`list-${kind || "empty"}`);
  threadList.innerHTML = "";
  if (!template) return;
  threadList.appendChild(template.content.cloneNode(true));
}

function syncNav(name) {
  const lettersActive = ["inbox", "invite", "accept", "chat", "ephemeral", "dms", "wiped"].includes(
    name
  );
  navItems.forEach((btn) => {
    if (btn.dataset.nav === "lines") {
      btn.classList.toggle("is-active", lettersActive);
    }
  });
}

function go(name) {
  if (!META[name]) return;

  const isWeb = name === "square";
  app.hidden = isWeb;
  web.hidden = !isWeb;

  document.querySelectorAll("#app-main .screen").forEach((screen) => {
    const active = screen.dataset.screen === name;
    screen.classList.toggle("is-active", active);
    if (active) renderList(screen.dataset.list || "empty");
  });

  railButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.go === name);
  });

  syncNav(name);
  titleEl.textContent = META[name].title;
  metaEl.textContent = META[name].meta;
  history.replaceState(null, "", `#${name}`);
  enterCount = 0;
}

document.querySelectorAll("[data-go]").forEach((btn) => {
  btn.addEventListener("click", () => go(btn.dataset.go));
});

window.addEventListener("keydown", (event) => {
  if (event.altKey && (event.key === "\\" || event.code === "Backslash")) {
    event.preventDefault();
    body.classList.toggle("rail-collapsed");
    return;
  }

  const active = document.querySelector("#app-main .screen.is-active")?.dataset.screen;

  if (event.key === "Control") {
    ctrlCount += 1;
    clearTimeout(ctrlTimer);
    ctrlTimer = setTimeout(() => {
      ctrlCount = 0;
    }, 600);
    if (ctrlCount >= 2 && active && !["dms", "wiped", "splash", "square"].includes(active)) {
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

const initialRaw = location.hash.replace("#", "") || "splash";
const initial = initialRaw === "survival" ? "settings" : initialRaw;
go(META[initial] ? initial : "splash");
