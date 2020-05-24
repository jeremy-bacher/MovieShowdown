const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'daf5b6e1',
			s: searchTerm
		}
	});
	if (response.data.Error) {
		return [];
	}
	return response.data.Search;
};

createAutoComplete({
	root: document.querySelector('#autocomplete-left'),
	onOptionSelect(movie) {
		onMovieSelect(movie, document.querySelector('#summary-left'), 'left');
	}
});

createAutoComplete({
	root: document.querySelector('#autocomplete-right'),
	onOptionSelect(movie) {
		onMovieSelect(movie, document.querySelector('#summary-right'), 'right');
	}
});

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'daf5b6e1',
			i: movie.imdbID
		}
	});

	const movieStats = {
		metascore: parseInt(response.data.Metascore),
		imdbRating: parseFloat(response.data.imdbRating),
		imdbVotes: parseInt(response.data.imdbVotes.replace(/,/g, ''))
	};

	const summary = summaryElement;
	summary.innerHTML = movieTemplate(response.data, movieStats);

	if (side === 'left') {
		leftMovie = movieStats;
	} else {
		rightMovie = movieStats;
	}

	if (leftMovie && rightMovie) {
		movieComparison();
	}
};

const movieComparison = () => {
	const leftMovieStats = document.querySelectorAll('#summary-left .notification');
	const rightMovieStats = document.querySelectorAll('#summary-right .notification');

	leftMovieStats.forEach((leftStat, index) => {
		if (leftStat.dataset.value > rightMovieStats[index].dataset.value) {
			leftMovieStats[index].classList.add('is-primary');
			leftMovieStats[index].classList.remove('is-warning');
			rightMovieStats[index].classList.add('is-warning');
			rightMovieStats[index].classList.remove('is-primary');
		} else if (leftStat.dataset.value === rightMovieStats[index].dataset.value) {
			leftMovieStats[index].classList.add('is-primary');
			leftMovieStats[index].classList.remove('is-warning');
			rightMovieStats[index].classList.add('is-primary');
			rightMovieStats[index].classList.remove('is-warning');
		} else {
			rightMovieStats[index].classList.add('is-primary');
			rightMovieStats[index].classList.remove('is-warning');
			leftMovieStats[index].classList.add('is-warning');
			leftMovieStats[index].classList.remove('is-primary');
		}
	});
};

const movieTemplate = (movieDetail, movieStats) => {
	return `
		<article class="media">
			<figure class="media-left">
				<img src="${movieDetail.Poster}" alt="">
			</figure>
			<div class="media-content">
				<div class="content">
					<h1 class="title">${movieDetail.Title}</h1>
					<p class="subtitle">${movieDetail.Year}</p>
					<p class="subtitle plot">${movieDetail.Plot}</p>
				</div>
			</div>
		</article>
		<div class="notification is-primary awards">
			<h1 class="title">${movieDetail.Awards}</h1>
			<p class="subtitle">Awards</p>
		</div>
		<div data-value=${movieStats.metascore} class="notification is-primary">
			<h1 class="title">${movieDetail.Metascore}</h1>
			<p class="subtitle">Metascore</p>
		</div>
		<div data-value=${movieStats.imdbRating} class="notification is-primary">
			<h1 class="title">${movieDetail.imdbRating}</h1>
			<p class="subtitle">IMDB Rating</p>
		</div>
		<div data-value=${movieStats.imdbVotes} class="notification is-primary">
			<h1 class="title">${movieDetail.imdbVotes}</h1>
			<p class="subtitle">IMDB Votes</p>
		</div>
	`;
};
