const createMovie = (show) => {
    const movieMainContainer = document.createElement("div");
    movieMainContainer.classList.add("main__movieContainer");

    const name = document.createElement("h2");
    name.classList.add("name__movie");
    name.textContent = show.name;

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info_movie");

    const movieImage = document.createElement("img");
    movieImage.classList.add("img__movie");
    movieImage.src = show.image ? show.image.medium : '';
    movieImage.alt = show.name;

    const genresDiv = document.createElement("div");
    genresDiv.classList.add("div__genres");

    const genresDivTitle = document.createElement("div");
    genresDivTitle.classList.add("div__genresTitle");

    const genresDivGenres = document.createElement("div");
    genresDivGenres.classList.add("div__genresGenres");

    const genresTitle = document.createElement("span");
    genresTitle.classList.add("genres__title");
    genresTitle.textContent = "Genres:";
    genresDiv.appendChild(genresTitle);

    
    const genreSpan = document.createElement("span");
    genreSpan.classList.add("genre");
    genreSpan.textContent = show.genres;
    genresDivGenres.appendChild(genreSpan);
    

    const divCountry = document.createElement("div");
    divCountry.classList.add("div__country");

    const countryTitle = document.createElement("span");
    countryTitle.classList.add("country__title")
    countryTitle.textContent = "Country: ";

    const countryMovie = document.createElement("span");
    countryMovie.classList.add("country__movie");
    countryMovie.textContent = show.network ? show.network.country.name : 'N/A';

    divCountry.appendChild(countryTitle);
    divCountry.appendChild(countryMovie);

    const divLeng = document.createElement("div");
    divLeng.classList.add("div__leng");

    const lengTitle = document.createElement("span");
    lengTitle.classList.add("leng__title");
    lengTitle.textContent = "Lenguaje:";

    const lengMovie = document.createElement("span");
    lengMovie.classList.add("leng__movie");
    lengMovie.textContent = show.language ? show.language: "N/A";

    divLeng.appendChild(lengTitle);
    divLeng.appendChild(lengMovie);

    const divPlatform = document.createElement("div");
    divPlatform.classList.add("div__platform");

    const platformTitle = document.createElement("span");
    platformTitle.classList.add("platform__title")
    platformTitle.textContent = "Platform: ";

    const platformName = document.createElement("span");
    platformName.classList.add("platform__name");
    platformName.textContent = show.network ? show.network.name : 'N/A';

    divPlatform.appendChild(platformTitle);
    divPlatform.appendChild(platformName);

    const divOff = document.createElement("div");
    divOff.classList.add("div__off");

    const officialTitle = document.createElement("span");
    officialTitle.classList.add("official_title");
    officialTitle.textContent = "Official Site: ";

    const offSiteButton = document.createElement("button");
    offSiteButton.classList.add("button__offsite");
    offSiteButton.textContent = "Go to Official Site";
    offSiteButton.onclick = function() {
        window.open(show.officialSite, "_blank");
    };

    divOff.appendChild(officialTitle);
    divOff.appendChild(offSiteButton);

    const summaryDiv = document.createElement("div");
    summaryDiv.classList.add("div__summary");

    const summaryTitle = document.createElement("span");
    summaryTitle.classList.add("summary__title");
    summaryTitle.textContent = "Summary :";

    const summary = document.createElement("span");
    summary.classList.add("summary");
    summary.innerHTML = show.summary;

    movieMainContainer.appendChild(name);
    infoDiv.appendChild(movieImage);
    infoDiv.appendChild(genresDiv);
    genresDiv.appendChild(genresDivTitle);
    genresDiv.appendChild(genresDivGenres);
    infoDiv.appendChild(divCountry);
    infoDiv.appendChild(divLeng);
    infoDiv.appendChild(divPlatform);
    infoDiv.appendChild(divOff);
    summaryDiv.appendChild(summaryTitle);
    summaryDiv.appendChild(summary);
    movieMainContainer.appendChild(infoDiv);
    movieMainContainer.appendChild(summaryDiv);

    return movieMainContainer;
 }

const createListMovies = (show, index) => {
    const nameMovie = document.createElement("p");
    nameMovie.classList.add("movie__name");
    nameMovie.textContent = `${index + 1}. ${show.name}`;
    nameMovie.setAttribute("data-name", show.name);

    return nameMovie;
}

const loadAllShows = async () => {

    const spinner = document.querySelector('.spinner-container');
    spinner.style.display = 'flex'; // Mostrar el spinner

    const listGrid = document.querySelector(".list__container");
    let shows = [];
    let page = 0;
    let moreShows = true;

    while (moreShows) {
        try {
            const response = await axios.get(`https://api.tvmaze.com/shows?page=${page}`);
            const data = response.data;

            if (data.length > 0) {
                shows = shows.concat(data);

                page++;
            } else {
                moreShows = false;
            }

        } catch (error) {
            console.log("Error de fetch: ", error);
            moreShows = false;
        }
    }

    spinner.style.display = 'none';

    const showsOrdered = shows.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    });

    const totalOfMovies = document.querySelector(".movies__perLetter");
    const totalOfMoviesQty = showsOrdered.length;
    const totalOfMoviesFormated = totalOfMoviesQty.toLocaleString('en-US', {
       minimumFractionDigits: 0,
       maximumFractionDigits: 2
   })

    totalOfMovies.textContent = `Total of movies/series = ${totalOfMoviesFormated}`;

    const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
    const arrayABC = ABC.split("");

    arrayABC.forEach((letter) => {
        const indexLetter = document.createElement("p");
        const letterMenu = document.querySelector(".letters__menu");
        indexLetter.textContent = letter;
        indexLetter.classList.add("letter");
        indexLetter.addEventListener("click", () => filterShowsByLetter(letter));
        letterMenu.appendChild(indexLetter);
    });

    listGrid.innerHTML = "";

    

    const filterShowsByLetter = (letter) => {
        listGrid.innerHTML = "";
        const filteredShows = showsOrdered.filter(show => show.name[0].toUpperCase() === letter);
        console.log(filteredShows)
        const qty = filteredShows.length;
        const formatedQty = qty.toLocaleString('en-US', {
       minimumFractionDigits: 0,
       maximumFractionDigits: 2
       });

        filteredShows.forEach((show, index) => {
            const listMovies = createListMovies(show, index);
            listGrid.appendChild(listMovies);
        });
        const QtyPerLetter = document.querySelector(".movies__perLetter");
        QtyPerLetter.textContent = `Quantity of Movies start with "${letter}" = ${formatedQty} movies/series`;

        const moviesNamesNodeList = document.querySelectorAll(".movie__name");
        moviesNamesNodeList.forEach(movieName => {
            movieName.addEventListener("click", async (event) => {
                const movieTitle = event.target.getAttribute("data-name");
                const moviesGrid = document.querySelector(".list__container");
                try {
                    const response = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${movieTitle}`);
                    moviesGrid.innerHTML = "";
                    const showCard = createMovie(response.data);
                    moviesGrid.appendChild(showCard);
                } catch (error) {
                    console.log("Error in finding movie:", error);
                }
            });
        });

        
    };

    /*showsOrdered.forEach((show, index) => {
        const listMovies = createListMovies(show, index);
        listGrid.appendChild(listMovies);
    });*/

    
}

const searchMovie = async () => {
    const movieName = document.getElementById("input__text").value.toLowerCase();
    //console.log(`Movie´s name is ${movieName}`);
    const moviesGrid = document.querySelector(".list__container");
    if(movieName) {
        try {
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${movieName}`);
            
            const shows = response.data;

            moviesGrid.innerHTML = "";

            for (const show of shows) {
                const showCard = createMovie(show.show);
                moviesGrid.appendChild(showCard);
            }
            
        } catch (error) {
            console.log("Error in finding movie:", error)
        }
    }
};

document.getElementById("search__buttonList").addEventListener("click", searchMovie);
document.getElementById("input__text").addEventListener("keypress", function (e) {
    if(e.key === "Enter") {
        searchMovie();
    }
})

document.addEventListener("DOMContentLoaded", loadAllShows);

document.addEventListener("DOMContentLoaded", () => {
    const iconoList = document.querySelector(".icono__list");

    if (iconoList) {
        iconoList.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const iconoList = document.querySelector(".icono__genre");

    if (iconoList) {
        iconoList.addEventListener("click", () => {
            window.location.href = "gender.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const iconoList = document.querySelector(".icono__country");

    if (iconoList) {
        iconoList.addEventListener("click", () => {
            window.location.href = "country.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const iconoList = document.querySelector(".icono__country");

    if (iconoList) {
        iconoList.addEventListener("click", () => {
            window.location.href = "country.html";
        });
    }
});

document.querySelector('.menu__icono').addEventListener('click', function() {
    document.querySelector('.menu').classList.add('open');
  });

document.querySelector(".icono__close").addEventListener("click", () => {
        document.querySelector('.menu').classList.remove("open");
});

document.addEventListener('click', function(event) {
    const menu = document.querySelector('.menu');
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnMenuIcon = event.target.matches('.menu__icono');
  
    if (!isClickInsideMenu && !isClickOnMenuIcon) {
      menu.classList.remove('open');
    }
});

const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
