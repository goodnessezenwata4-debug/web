/* =========================================================
   LAS-VEGAS WEB
   SCRIPT.JS
========================================================= */

/* ================= PRELOADER ================= */

const preloader = document.getElementById("preloader");
const loaderProgress = document.getElementById("loaderProgress");
const loaderPercent = document.getElementById("loaderPercent");

let progress = 0;

const loaderTimer = setInterval(() => {
  progress += Math.floor(Math.random() * 5) + 1;

  if (progress >= 100) {
    progress = 100;
    clearInterval(loaderTimer);

    loaderProgress.style.width = "100%";
    loaderPercent.textContent = "100%";

    setTimeout(() => {
      preloader.classList.add("hide");

      setTimeout(() => {
        preloader.remove();
      }, 900);

    }, 450);
  }

  loaderProgress.style.width = progress + "%";
  loaderPercent.textContent = progress + "%";

}, 45);


/* ================= PAGE / VIEW SWITCHING ================= */

const buttons = document.querySelectorAll("[data-view]");
const views = document.querySelectorAll(".view");
const navLinks = document.querySelectorAll(".nav-link");

function showView(name) {

  views.forEach(view => {
    view.classList.toggle(
      "active",
      view.id === name
    );

    if (view.id === name) {
      view.scrollTop = 0;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.view === name
    );
  });
}

buttons.forEach(button => {

  button.addEventListener("click", () => {

    const target = button.dataset.view;

    if (target) {
      showView(target);
    }

  });

});


/* ================= CUSTOM CURSOR ================= */

const cursor = document.getElementById("cursor");
const cursorFollower =
  document.getElementById("cursorFollower");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let followerX = mouseX;
let followerY = mouseY;


/*
  Main cursor:
  follows the mouse directly.
*/

document.addEventListener("mousemove", (event) => {

  mouseX = event.clientX;
  mouseY = event.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";

});


/*
  Cursor follower:
  smoothly catches up to the main cursor.
*/

function animateFollower() {

  followerX +=
    (mouseX - followerX) * 0.14;

  followerY +=
    (mouseY - followerY) * 0.14;

  cursorFollower.style.left =
    followerX + "px";

  cursorFollower.style.top =
    followerY + "px";

  requestAnimationFrame(
    animateFollower
  );
}

animateFollower();


/* ================= CURSOR GROW ================= */

/*
  Anything with .magnetic gets the
  cursor grow effect.
*/

function activateCursorGrow() {

  const interactive =
    document.querySelectorAll(
      ".magnetic, a, button"
    );

  interactive.forEach(element => {

    element.addEventListener(
      "mouseenter",
      () => {

        cursor.classList.add("grow");

        cursorFollower.classList.add("grow");

      }
    );

    element.addEventListener(
      "mouseleave",
      () => {

        cursor.classList.remove("grow");

        cursorFollower.classList.remove("grow");

      }
    );

  });
}

activateCursorGrow();


/* ================= CURSOR LEAVE WINDOW ================= */

document.addEventListener("mouseleave", () => {

  cursor.style.opacity = "0";
  cursorFollower.style.opacity = "0";

});

document.addEventListener("mouseenter", () => {

  cursor.style.opacity = "1";
  cursorFollower.style.opacity = "1";

});


/* ================= OPTIONAL KEYBOARD NAVIGATION ================= */

const viewNames = [
  "home",
  "services",
  "about",
  "work",
  "contact"
];

document.addEventListener("keydown", (event) => {

  const activeView =
    document.querySelector(".view.active");

  if (!activeView) return;

  const currentIndex =
    viewNames.indexOf(activeView.id);

  if (event.key === "ArrowRight") {

    const next =
      viewNames[
        (currentIndex + 1) %
        viewNames.length
      ];

    showView(next);

  }

  if (event.key === "ArrowLeft") {

    const previous =
      viewNames[
        (currentIndex - 1 +
          viewNames.length) %
        viewNames.length
      ];

    showView(previous);

  }

});


/* ================= MOUSE WHEEL IS NOT USED ================= */

/*
  The website intentionally does NOT use normal
  page scrolling to move between Home, Services,
  About, Work and Contact.

  Navigation buttons switch views inside
  the same index.html.
*/
const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

let musicStarted = false;

// Try to start music
function startMusic() {
    if (musicStarted) return;

    backgroundMusic.volume = 0.35;

    backgroundMusic.play()
        .then(() => {
            musicStarted = true;
            musicToggle.textContent = "🔊 ACTIVADA";
        })
        .catch(() => {
            // Browser blocked autoplay.
        });
}

// Start after the visitor interacts with the page
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });

// Music ON/OFF button
musicToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = "🔊 ACTIVADA";
    } else {
        backgroundMusic.pause();
        musicToggle.textContent = "🔇 DEACTIVADA";
    }
});