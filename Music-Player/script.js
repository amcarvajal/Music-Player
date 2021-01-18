



const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [{
        name: '50 Cent - In Da Club (Official Music Video)',
        displayName: 'In Da Club',
        artist: '50 Cent',
    },
    {
        name: 'Eminem - Lose Yourself [HD]',
        displayName: 'Lose Yourself',
        artist: 'Eminem',
    },
    {
        name: 'In The End (Official HD Video) - Linkin Park',
        displayName: 'In the End',
        artist: 'Linkin Park',
    },
    {
        name: 'Natos y Waor - DELIRIUM ft. Recycled J (Videoclip Oficial) [Martes 13]',
        displayName: 'Delirium',
        artist: 'Natos y Waor',
    },

    {
        name: 'Survivor - Eye Of The Tiger (Official HD Video)',
        displayName: 'Eye Of The Tiger',
        artist: 'Survivor',
    },
    {
        name: 'The Prodigy - Voodoo People (Pendulum Remix)',
        displayName: 'Voodoo People',
        artist: 'The Prodigy',
    },
];

// Check if Playing  //
let isPlaying = false;

// Plays
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause  //
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener  //
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM  //
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.m4a`;
    image.src = `images/${song.name}.jpg`;
}

// Current Song  //
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//  Progress Bar  //
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Events Listener   //
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);