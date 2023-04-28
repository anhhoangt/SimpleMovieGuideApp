let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//function to fetch data from API

let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  //if input field is empty
  if (movieName == "") {
    result.innerHTML = `<h2 class="text-center text-danger">Please enter a movie name</h2>`;
  }

  // if input field is not empty
  else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //if movie exist in database
        if (data.Response == "True") {
          result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="star-icon.png">
                            <h4> ${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Runtime}</span>
                            <span>${data.Year}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join(
                              "</div><div>"
                            )}</div>
                        </div>
                    </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
            `;
        }
        //if movie does not exist in database
        else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      // if error occurs
      .catch((err) => {
        result.innerHTML = `<h3 class="msg">${err}</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
