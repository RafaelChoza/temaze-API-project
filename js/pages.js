let currentGenreMovies = [];
let currentPage = 1;
const moviesPerPage = 50;

const filterMoviesPerGenre = (genreMovie) => {
    const moviesGrid = document.querySelector(".list__container");
    moviesGrid.innerHTML = "";
    
    currentGenreMovies = shows.filter(show => show.genres.includes(genreMovie));
    
    const qty = currentGenreMovies.length;
    const qtyPerGenreFormated = qty.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    const qtyPerGenre = document.querySelector(".movies__perGenre");
    qtyPerGenre.textContent = `${genreMovie} Movies/Series = ${qtyPerGenreFormated}`;

    currentPage = 1; // Reset to first page
    displayMoviesByPage(currentPage);
    createPaginationButtons();
};

const displayMoviesByPage = (page) => {
    const moviesGrid = document.querySelector(".list__container");
    moviesGrid.innerHTML = "";

    const start = (page - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    const paginatedMovies = currentGenreMovies.slice(start, end);

    paginatedMovies.forEach(show => {
        const showCard = createMovie(show);
        moviesGrid.appendChild(showCard);
    });
};

const createPaginationButtons = () => {
    const paginationContainer = document.querySelector(".pagination__container");
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(currentGenreMovies.length / moviesPerPage);
    
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("page__button");
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
        pageButton.addEventListener("click", () => {
            currentPage = i;
            displayMoviesByPage(currentPage);
            updatePaginationButtons();
        });
        paginationContainer.appendChild(pageButton);
    }
};

const updatePaginationButtons = () => {
    const pageButtons = document.querySelectorAll(".page__button");
    pageButtons.forEach(button => {
        if (parseInt(button.textContent) === currentPage) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
};