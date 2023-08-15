const audioPlayer = document.getElementById("audio-player");
const previousButton = document.getElementById("previous-button");
const playPauseButton = document.getElementById("play-pause-button");
const nextButton = document.getElementById("next-button");


const musicSources = [
    "music/Floating Abstract.mp3",
    "music/For Future Bass.mp3",
    "music/Good Night.mp3",
    "music/Modern Vlog.mp3",
    "music/Unlock Me.mp3",
];

let isPlaying = false;

let currentTrackIndex = 0;

const songNameElement = document.querySelector(".song-name");

function loadTrack(index) {
    if (index >= 0 && index < musicSources.length) {
        audioPlayer.removeEventListener("ended", playNextTrack);

        audioPlayer.src = musicSources[index];
        audioPlayer.load();
        audioPlayer.play();
        currentTrackIndex = index;
    
        const songName = musicSources[index].split("/").pop().split(".")[0];
        songNameElement.textContent = songName;

        audioPlayer.addEventListener("ended", playNextTrack);
    }
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % musicSources.length;
    loadTrack(currentTrackIndex);
}


previousButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + musicSources.length) % musicSources.length;
    loadTrack(currentTrackIndex);
});

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }

    // Toggle play and pause icons
    playPauseButton.classList.toggle("playing");
    isPlaying = !isPlaying;
});

audioPlayer.addEventListener("play", () => {
    playPauseButton.classList.add("playing");
    isPlaying = true;
});

audioPlayer.addEventListener("pause", () => {
    playPauseButton.classList.remove("playing");
    isPlaying = false;
});

nextButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % musicSources.length;
    loadTrack(currentTrackIndex);
});

// Load and play the first track initially
loadTrack(currentTrackIndex);
