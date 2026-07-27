console.log("SqueezePlayer loaded");

// Detect Lite Mode (old browsers)
const modeText = document.getElementById("mode");
let liteMode = false;

if (!("serviceWorker" in navigator)) {
  liteMode = true;
  modeText.innerText = "Lite Mode: Older browser detected.";
} else {
  modeText.innerText = "Modern Mode: Full PWA features enabled.";
}

// Register service worker only if supported
if (!liteMode) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch(err => console.log("SW registration failed:", err));
}

// --- Audio Playback ---
const playBtn = document.getElementById("play");

playBtn.addEventListener("click", () => {
  console.log("Play button clicked");

  if (liteMode) {
    // Old browser fallback
    document.getElementById("fallbackPlayer").play();
    console.log("Playing using fallback <audio> tag");
  } else {
    // Modern playback
    const audio = new Audio("song.mp3");
    audio.play()
      .then(() => console.log("Playing audio"))
      .catch(err => console.error("Audio error:", err));
  }
});

// --- Universal Install Button ---
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  document.getElementById("installStatus").innerText =
    "Your device supports installation!";
});

document.getElementById("install").addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    document.getElementById("installStatus").innerText =
      "Install status: " + result.outcome;

    deferredPrompt = null;
  } else {
    document.getElementById("installStatus").innerText =
      "Your browser does not support automatic install. Add to Home Screen manually.";
  }
});
