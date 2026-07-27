console.log("SqueezePlayer loaded");

// --- Test Audio Playback ---
const playBtn = document.getElementById("play");

playBtn.addEventListener("click", () => {
  console.log("Play button clicked");

  // Replace this with your decompressed SqueezeBox audio later
  const audio = new Audio("24K_Magic_KLICKAUD.mp3");
  audio.play()
    .then(() => console.log("Playing audio"))
    .catch(err => console.error("Audio error:", err));
});

// --- Register Service Worker ---
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch(err => console.log("SW registration failed:", err));
}
