"use strict";

const today = new Date();
const dayEl = document.querySelector(".date-day");
const dateEl = document.querySelector(".date-num");
const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const hourEl = document.querySelector(".time-hour");
const img = document.querySelector(".img");
const minEl = document.querySelector(".time-minute");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const playEl = document.querySelector(".play");
const prevEl = document.querySelector(".backward");
const nextEl = document.querySelector(".forward");
const durEl = document.querySelector(".duration");
const name = document.querySelector(".music-name");
const artist = document.querySelector(".music-artist");
const music = document.querySelector("audio");

class App {
	isPlaying = false;
	song = 0;
	count = 0;

	songs = [
		{
			name: "Ice-Cream",
			artist: "Falz (feat. BNXN)",
			displayName: "Falz - Ice Cream (feat. BNXN)",
		},
		{
			name: "Science-Student",
			artist: "Olamide",
			displayName: "Olamide - Science Student",
		},
		{
			name: "Calm-Down",
			artist: "Rema",
			displayName: "Rema - Calm-Down",
		},
		{
			name: "Who-You-Epp",
			artist: "Olamide",
			displayName: "Olamide - Who You Epp [Prod. by Shizzi]",
		},
	];

	constructor() {
		this.updateDate();
		setInterval(this.updateTime, 1000);
		this.loadSong(this.songs[this.song]);
		playEl.addEventListener("click", () => {
			this.isPlaying ? this.pauseSong() : this.playSong();
		});
		music.addEventListener("timeupdate", this.updateProgress.bind(this));
		nextEl.addEventListener("click", this.nextSong.bind(this));
		prevEl.addEventListener("click", this.prevSong.bind(this));
	}

	updateDate() {
		dayEl.textContent = days[today.getDay()];
		dateEl.textContent = today.getDate();
	}

	updateTime() {
		hourEl.textContent =
			today.getHours() < 10 ? `0${today.getHours()}` : `${today.getHours()}`;
		minEl.textContent =
			today.getMinutes() < 10
				? `0${today.getMinutes()}`
				: `${today.getMinutes()}`;
	}

	playSong() {
		this.isPlaying = true;
		playEl.classList.replace("fa-play", "fa-pause");
		music.play();

		const duration = music.duration;
		durEl.textContent = `0${Math.floor(duration / 60)}:${Math.floor(
			duration % 60
		)}`;
	}

	pauseSong() {
		this.isPlaying = false;
		playEl.classList.replace("fa-pause", "fa-play");
		music.pause();
	}

	updateSong() {
		if (this.song >= this.songs.length) {
			this.song = 0;
		} else if (this.song < 0) {
			this.song = this.songs.length - 1;
		}
	}

	nextSong() {
		this.pauseSong();
		this.song++;
		this.updateSong();
		this.loadSong(this.songs[this.song]);
	}

	prevSong() {
		this.pauseSong();
		this.song--;
		this.updateSong();
		this.loadSong(this.songs[this.song]);
	}

	loadSong(song) {
		progress.style.width = "0%";
		name.textContent = song.displayName;
		artist.textContent = song.artist;
		img.src = `./img/${song.name}.jpg`;
		music.src = `./music/${song.name}.mp3`;
	}

	updateProgress(e) {
		if (this.isPlaying) {
			const { currentTime, duration } = e.srcElement;
			const progressWidth = (currentTime / duration) * 100;

			progress.style.width = `${progressWidth}%`;
		}
	}
}

const app = new App();
