document.addEventListener("DOMContentLoaded", fetchAnimes);

function fetchAnimes() {
    fetch("/anime")
        .then(response => response.json())
        .then(data => displayAnimes(data))
        .catch(error => console.error("Error fetching anime data:", error));
}

function displayAnimes(animes) {
    const tableBody = document.getElementById("animeTable");
    tableBody.innerHTML = "";
    animes.forEach((anime, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${anime.title}</td>
            <td>${anime.genre.join(", ")}</td>
            <td>${anime.episodes}</td>
            <td>${anime.rating}</td>
            <td>
                <button onclick="editAnime('${anime._id}', '${anime.title}', '${anime.genre.join(", ")}', ${anime.episodes}, ${anime.rating})">Edit</button>
                <button onclick="deleteAnime('${anime._id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addOrUpdateAnime() {
    const animeId = document.getElementById("animeId").value;
    const animeData = {
        title: document.getElementById("title").value,
        genre: document.getElementById("genre").value.split(","),
        episodes: Number(document.getElementById("episodes").value),
        rating: Number(document.getElementById("rating").value),
    };

    const url = animeId ? `/anime/${animeId}` : "/anime";
    const method = animeId ? "PUT" : "POST";

    fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(animeData) })
        .then(() => fetchAnimes());
}

function deleteAnime(id) {
    fetch(`/anime/${id}`, { method: "DELETE" })
        .then(() => fetchAnimes());
}

function editAnime(id, title, genre, episodes, rating) {
    document.getElementById("animeId").value = id;
    document.getElementById("title").value = title;
    document.getElementById("genre").value = genre;
    document.getElementById("episodes").value = episodes;
    document.getElementById("rating").value = rating;
}
document.addEventListener("DOMContentLoaded", function () {
    fetch("/anime")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Anime Data:", data);  // Debugging
            if (data.length === 0) {
                console.log("No anime found in database.");
            }
            displayAnimes(data);
        })
        .catch(error => console.error("Error fetching anime data:", error));
});
