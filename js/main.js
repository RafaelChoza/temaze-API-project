
let currentPage = 1;

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



    show.genres.forEach(genre => {
        const genreSpan = document.createElement("span");
        genreSpan.classList.add("genre");
        genreSpan.textContent = genre ? genre: "N/A";
        genresDivGenres.appendChild(genreSpan);
    });

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
    lengMovie.textContent = show.language;

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

 const loadMovies = async (page = 1) => {
    const moviesGrid = document.querySelector(".movies__container");
    try {
        const response = await axios.get("https://api.tvmaze.com/shows", { params: {page : page -1} });
        const shows = response.data;
        console.log(shows)

        moviesGrid.innerHTML = "";

        for (const show of shows) {
            const showCard = createMovie(show);
            moviesGrid.appendChild(showCard);
        }

        document.getElementById("current__page").textContent = page;
        document.getElementById("prev__page").disabled = page === 1;
    } catch (error) {
        console.log("Error de fetch: ", error);
    }
 }
 
 document.addEventListener("DOMContentLoaded", loadMovies(currentPage));

 const nextPage = () => {
    currentPage++;
    loadMovies(currentPage);
 }

 const prevPage = () => {
    if(currentPage > 1) {
        currentPage--;
        loadMovies(currentPage);
    }
 }

 const goToPage =  async () => {
    const pageInput = document.getElementById("input__page").value - 1;
    const moviesGrid = document.querySelector(".movies__container");
    try {
        const response = await axios.get(`https://api.tvmaze.com/shows?page=${pageInput}`);
        console.log(response)
        const shows = response.data;

        moviesGrid.innerHTML = "";

        for (const show of shows) {
            const showCard = createMovie(show);
            moviesGrid.appendChild(showCard);
        }

        currentPage = pageInput;
        document.getElementById("current__page").textContent = currentPage +1;
        document.getElementById("prev__page").disabled = currentPage == 1;
        

        
    } catch {
        
    }
    

 }

 document.getElementById("next__page").addEventListener("click", nextPage);
 document.getElementById("prev__page").addEventListener("click", prevPage);
 document.getElementById("go__button").addEventListener("click", goToPage);
 document.getElementById("input__page").addEventListener("keypress", function (e) {
    if(e.key === "Enter") {
        goToPage();
    }
})

 const searchMovie = async () => {
    const movieName = document.getElementById("input__text").value.toLowerCase();
    console.log(`Movie´s name is ${movieName}`);
    if(movieName) {
        try {
            const response = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${movieName}`);
            const moviesGrid = document.querySelector(".movies__container");
            const show = response.data;
            console.log(show);
            moviesGrid.innerHTML = "";
            const showCard = createMovie(show);
            moviesGrid.appendChild(showCard);
        } catch (error) {
            console.log("Error in finding movie:", error)
        }
    }
 };

document.getElementById("search__button").addEventListener("click", searchMovie);
document.getElementById("input__text").addEventListener("keypress", function (e) {
    if(e.key === "Enter") {
        searchMovie();
    }
})

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

document.addEventListener("DOMContentLoaded", () => {
    const iconoList = document.querySelector(".icono__list");

    if (iconoList) {
        iconoList.addEventListener("click", () => {
            window.location.href = "list.html";
        });
    }
});


 