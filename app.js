//57d0ef2f

// app.js

// 🔁 Replace with your OMDb API Key
const apiKey = "57d0ef2f";

// Handles search button click
function searchMovie(event) {
    event.preventDefault();
    const input = document.getElementById("searchInput").value.trim();
    if (input !== "") {
        const query = encodeURIComponent(input);
        window.location.href = `info.html?title=${query}`;
    }
}

// Binds the search icon click
function bindSearchButton() {
    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn) {
        searchBtn.addEventListener("click", searchMovie);
    }
}

// Adds click handlers to all movie cards
function attachMovieClickListeners() {
    const movieLinks = document.querySelectorAll(".movies");

    movieLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const title = this.getAttribute("data-title");
            if (title) {
                const query = encodeURIComponent(title);
                window.location.href = `info.html?title=${query}`;
            }
        });
    });
}

// Fetches data from OMDb API and updates info page
async function loadMovieData() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");

    if (!title) {
        document.querySelector(".info-content").innerHTML = "<h2>No movie selected.</h2>";
        return;
    }

    const url = `https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === "False") {
            document.querySelector(".info-content").innerHTML = `<h2>Movie not found: ${title}</h2>`;
            return;
        }

        document.querySelector(".title").textContent = data.Title;
        document.getElementById("rating").textContent = data.imdbRating;
        document.getElementById("Votes").textContent = data.imdbVotes;
        document.getElementById("runtime").textContent = data.Runtime;
        document.getElementById("year").textContent = data.Year;
        document.getElementById("plot").textContent = data.Plot;
        document.getElementById("director").textContent = data.Director;
        document.getElementById("actors").textContent = data.Actors;
        document.getElementById("genres").textContent = data.Genre;
        document.getElementById("languages").textContent = data.Language;
        document.getElementById("awards").textContent = data.Awards;

        const poster = data.Poster !== "N/A" ? data.Poster : "";
        document.querySelector(".info-image").style.backgroundImage = `url(${poster})`;
    } catch (err) {
        console.error("Error fetching movie data:", err);
        document.querySelector(".info-content").innerHTML = `<h2>Failed to load movie data.</h2>`;
    }
}

// ✅ Initialize logic based on current page
window.onload = () => {
    bindSearchButton();

    if (window.location.pathname.includes("info.html")) {
        loadMovieData();
    } else {
        attachMovieClickListeners();
    }
};
