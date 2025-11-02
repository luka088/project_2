const card = document.getElementById('card');
const reader = document.getElementById('reader');
let active = false;
let initialX;
let timeStart, timeEnd;

const soundAccepted = new Audio('https://thomaspark.co/projects/among-us-card-swipe/audio/CardAccepted.mp3');
const soundDenied = new Audio('https://thomaspark.co/projects/among-us-card-swipe/audio/CardDenied.mp3');

document.addEventListener('mousedown', dragStart);
document.addEventListener('mouseup', dragEnd);
document.addEventListener('mousemove', drag);
document.addEventListener('touchstart', dragStart);
document.addEventListener('touchend', dragEnd);
document.addEventListener('touchmove', drag);

function dragStart(e) {
  if (e.target !== card) return;

  if (e.type === 'touchstart') {
    initialX = e.touches[0].clientX;
  } else {
    initialX = e.clientX;
  }

  timeStart = performance.now();
  card.classList.remove('slide');
  active = true;

  // ✅ Mobiele audio activatie workaround
  soundAccepted.play().catch(() => {});
  soundDenied.play().catch(() => {});
  soundAccepted.pause();
  soundDenied.pause();
  soundAccepted.currentTime = 0;
  soundDenied.currentTime = 0;
}

function dragEnd(e) {
  if (!active) return;

  e.preventDefault();
  let x;
  let status;

  // ✅ FIX: Gebruik changedTouches bij touchend
  if (e.type === 'touchend') {
    x = e.changedTouches[0].clientX - initialX;
  } else {
    x = e.clientX - initialX;
  }

  const screenWidth = window.innerWidth;
  const threshold = screenWidth < 600 ? reader.offsetWidth * 0.3
                   : screenWidth < 1024 ? reader.offsetWidth * 0.4
                   : reader.offsetWidth * 0.6;

  if (x < threshold) {
    status = 'invalid';
  }

  timeEnd = performance.now();
  card.classList.add('slide');
  active = false;

  setTranslate(0);
  setStatus(status);
}

function drag(e) {
  if (!active) return;

  e.preventDefault();
  let x;

  if (e.type === 'touchmove') {
    x = e.touches[0].clientX - initialX;
  } else {
    x = e.clientX - initialX;
  }

  setTranslate(x);
}

function setTranslate(x) {
  if (x < 0) {
    x = 0;
  } else if (x > reader.offsetWidth) {
    x = reader.offsetWidth;
  }

  x -= (card.offsetWidth / 2);

  card.style.transform = 'translateX(' + x + 'px)';
}

function setStatus(status) {
  if (typeof status === 'undefined') {
    let duration = timeEnd - timeStart;

    if (duration > 700) {
      status = 'slow';
    } else if (duration < 400) {
      status = 'fast';
    } else {
      status = 'valid';
    }
  }

  reader.dataset.status = status;
  playAudio(status);

  if (status === 'valid') {
    // ✅ Wacht 1 seconde voordat formulier wordt verzonden
    setTimeout(() => {
      submitStoredForm();
    }, 1000);
  }
}

function playAudio(status) {
  soundDenied.pause();
  soundAccepted.pause();
  soundDenied.currentTime = 0;
  soundAccepted.currentTime = 0;

  if (status === 'valid') {
    soundAccepted.play();
  } else {
    soundDenied.play();
  }
}
document.getElementById("skipBtn").addEventListener("click", () => {
  // Simuleer een geldige swipe
  timeStart = performance.now();
  timeEnd = timeStart + 500; // Simuleer gemiddelde snelheid

  card.classList.add('slide');
  setTranslate(reader.offsetWidth); // Visueel naar rechts schuiven
  setStatus('valid');
});

function submitStoredForm() {
  const form = document.getElementById("hiddenForm");

  form.elements["voornaam"].value = localStorage.getItem("voornaam") || "";
  form.elements["achternaam"].value = localStorage.getItem("achternaam") || "";
  form.elements["email"].value = localStorage.getItem("email") || "";
  form.elements["bericht"].value = localStorage.getItem("bericht") || "";

  const skills = JSON.parse(localStorage.getItem("skills") || "[]");
  form.elements["skills"].value = skills.join(", ");

  form.submit();
}
