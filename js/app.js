/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Yonghun Won
 *      Student ID: 124331224
 *      Date:       24 July 2023
 */

const { songs, artists } = window;
const displayArtists = document.querySelector(".display-items");
const navbar = document.querySelector("#menu");

window.addEventListener("DOMContentLoaded", function () {
  const defaultArtist = artists.find((artist) => artist.name === "BTS");
  displaySelectedArtist(defaultArtist);

  displaySongArtists(
    songs.filter(function (song) {
      if (song.artists.includes(defaultArtist.id)) {
        return song;
      }
    })
  );

  displayMenuButtons();
});

function displaySelectedArtist(artist) {
  const selectedArtistElement = document.getElementById("selected-artist");
  selectedArtistElement.innerHTML = `${artist.name} (<a href="${artist.link}" target="_blank">Instagram</a>)`;
}

function displaySongArtists(songArtists) {
  let displaySongs = songArtists.map(function (song) {
    return createSongCard(song);
  });

  displaySongs = displaySongs.join("");
  displayArtists.innerHTML = displaySongs;
}

function createSongCard(song) {
  return `<article class="card">
    <img src="${song.imageUrl}" alt="Album-Image">
    <div class="card-info">
    <header>
      <h4>${song.title}</h4>
      <h4 class="year">${song.year}</h4>
    </header>
    <p class="card-text">${song.duration} secs</p>
    </div>
  </article>`;
}

function displayMenuButtons() {
  const artistButtons = artists
    .map(function (item) {
      return `<button data-id="${item.id}" class="filter-btn" type="button">${item.name}</button>`;
    })
    .join("");

  navbar.innerHTML = artistButtons;
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const artistId = e.currentTarget.dataset.id;
      const selectedArtist = artists.find((artist) => artist.id === artistId);
      displaySelectedArtist(selectedArtist);

      const songArtists = songs.filter(function (item) {
        if (item.artists.includes(artistId)) {
          return item;
        }
      });

      displaySongArtists(songArtists);
    });
  });
}
