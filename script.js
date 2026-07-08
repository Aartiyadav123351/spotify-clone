// 1. Song list — matches your 3 HTML songItems in order
const songs = [
    {
        name: "Cheery Cheery Lady",
        src: "cheerylady.mp3",
        duration: "03:34"
    },
    {
        name: "Love Me Like You Do",
        src: "lovemelikeyoudo.mp3",
        duration: "05:34"
    },
    {
        name: "Ajab Si",
        src: "ajabsi.mp3",
        duration: "05:34"
    }
];

let currentSongIndex = 0;
const audio = new Audio();

// 2. Grab elements from the DOM
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("MyProgressBar");
const currentSongName = document.getElementById("currentSongName");
const backwardBtn = document.querySelector(".fa-backward-step");
const forwardBtn = document.querySelector(".fa-forward-step");
const songItems = document.querySelectorAll(".songItem");

// 3. Load a song (without playing) - sets up audio + updates bottom bar
function loadSong(index) {
    currentSongIndex = index;
    audio.src = songs[index].src;
    currentSongName.textContent = songs[index].name;
}

// 4. Play the currently loaded song
function playSong() {
    audio.play();
    playBtn.classList.remove("fa-circle-play");
    playBtn.classList.add("fa-circle-pause");
}

// 5. Pause the currently loaded song
function pauseSong() {
    audio.pause();
    playBtn.classList.remove("fa-circle-pause");
    playBtn.classList.add("fa-circle-play");
}

// 6. Toggle play/pause when the main play button is clicked
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

// 7. Clicking a song in the list loads + plays it
songItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        loadSong(index);
        playSong();
    });
});

// 8. Next / Previous controls
forwardBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

backwardBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

// 9. Update progress bar as the song plays
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
    }
});

// 10. Let user seek by dragging the progress bar
progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// 11. Auto-play next song when current one ends
audio.addEventListener("ended", () => {
    forwardBtn.click();
});

// 12. Load the first song by default (without autoplaying)
loadSong(0);