const btn = document.querySelector("button");
const inputField = document.querySelector("input");
const containerForCards = document.querySelector("#resultsContainer");

const apiKey = "e827454c";

async function getMovieData(movie_name) {
  containerForCards.innerHTML = "";

  try {
    const raw_data = await fetch(
      `https://www.omdbapi.com/?s=${movie_name}&apikey=${apiKey}`
    );
    const data = await raw_data.json();

    if (data.Response === "True") {
      const movieInfo = data.Search;

      for (let i = 0; i < movieInfo.length; i++) {
        const card = document.createElement("div");
        card.className = "movie-card";

        const title = document.createElement("h1");
        title.textContent = movieInfo[i].Title;
        card.appendChild(title);

        const poster = document.createElement("img");
        poster.src = movieInfo[i].Poster;
        card.appendChild(poster);

        const type = document.createElement("h6");
        type.textContent = movieInfo[i].Type;
        card.appendChild(type);

        const year = document.createElement("h4");
        year.textContent = movieInfo[i].Year;
        card.appendChild(year);

        containerForCards.appendChild(card);
      }
    } else {
      containerForCards.innerHTML = `<p>No results found for ${movie_name}</p>`;
    }
  } catch (error) {
    console.log("Fetch error", error);
    containerForCards.innerHTML =
      "<p>Something went wrong. Please try again later!</p>";
  }
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const movie_name = document.querySelector("input").value.trim();
});
btn.addEventListener("click", function () {
  const movie_name = document.querySelector("input").value.trim();
  getMovieData(movie_name);
});

inputField.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    const movie_name = document.querySelector("input").value.trim();
    getMovieData(movie_name);
  }
});
