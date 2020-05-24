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
	async onOptionSelect(movie) {
		const response = await axios.get('http://www.omdbapi.com/', {
			params: {
				apikey: 'daf5b6e1',
				i: movie.imdbID
			}
		});
		const summary = document.querySelector('#summary-left');
		console.log(response.data);
		summary.innerHTML = `
		<article class="media">
			<figure class="media-left">
				<img src="${response.data.Poster}" alt="">
			</figure>
			<div class="media-content">
				<div class="content">
					<h1 class="title">${response.data.Title}</h1>
					<p class="subtitle">${response.data.Year}</p>
					<p class="subtitle">${response.data.Plot}</p>
				</div>
			</div>
		</article>
		<div class="notification is-primary">
			<h1 class="title">${response.data.Awards}</h1>
			<p class="subtitle">Awards</p>
		</div>
		<div class="notification is-primary">
			<h1 class="title">${response.data.Metascore}</h1>
			<p class="subtitle">Metascore</p>
		</div>
		<div class="notification is-primary">
			<h1 class="title">${response.data.imdbRating}</h1>
			<p class="subtitle">IMDB Rating</p>
		</div>
		<div class="notification is-primary">
			<h1 class="title">${response.data.imdbVotes}</h1>
			<p class="subtitle">IMDB Votes</p>
		</div>
	`;
	}
});

createAutoComplete({
	root: document.querySelector('#autocomplete-right'),
	async onOptionSelect(movie) {
		const response = await axios.get('http://www.omdbapi.com/', {
			params: {
				apikey: 'daf5b6e1',
				i: movie.imdbID
			}
		});
		const summary = document.querySelector('#summary-right');
		console.log(response.data);
		summary.innerHTML = `
		<article class="media">
			<figure class="media-left">
				<img src="${response.data.Poster}" alt="">
			</figure>
			<div class="media-content">
				<div class="content">
					<h1 class="title">${response.data.Title}</h1>
					<p class="subtitle">${response.data.Year}</p>
					<p class="subtitle">${response.data.Plot}</p>
				</div>
			</div>
		</article>
		<div class="notification is-primary">
			<h1 class="title">${response.data.Awards}</h1>
			<p class="subtitle">Awards</p>
		</div>
		<div class="notification is-primary">
			<h1 class="title">${response.data.Metascore}</h1>
			<p class="subtitle">Metascore</p>
		</div>
		<div class="notification is-primary">
			<h1 class="title">${response.data.imdbRating}</h1>
			<p class="subtitle">IMDB Rating</p>
		</div>
		<div class="notification is-primary">
			<h1 class="title">${response.data.imdbVotes}</h1>
			<p class="subtitle">IMDB Votes</p>
		</div>
	`;
	}
});

// const onOptionSelect = async (movie) => {
// 	const response = await axios.get('http://www.omdbapi.com/', {
// 		params: {
// 			apikey: 'daf5b6e1',
// 			i: movie.imdbID
// 		}
// 	});
// 	const summary = document.querySelector('.summary');
// 	console.log(response.data);
// 	summary.innerHTML = `
// 		<article class="media">
// 			<figure class="media-left">
// 				<img src="${response.data.Poster}" alt="">
// 			</figure>
// 			<div class="media-content">
// 				<div class="content">
// 					<h1 class="title">${response.data.Title}</h1>
// 					<p class="subtitle">${response.data.Year}</p>
// 					<p class="subtitle">${response.data.Plot}</p>
// 				</div>
// 			</div>
// 		</article>
// 		<div class="notification is-primary">
// 			<h1 class="title">${response.data.Awards}</h1>
// 			<p class="subtitle">Awards</p>
// 		</div>
// 		<div class="notification is-primary">
// 			<h1 class="title">${response.data.Metascore}</h1>
// 			<p class="subtitle">Metascore</p>
// 		</div>
// 		<div class="notification is-primary">
// 			<h1 class="title">${response.data.imdbRating}</h1>
// 			<p class="subtitle">IMDB Rating</p>
// 		</div>
// 		<div class="notification is-primary">
// 			<h1 class="title">${response.data.imdbVotes}</h1>
// 			<p class="subtitle">IMDB Votes</p>
// 		</div>
// 	`;
// };

// const renderMovie = () => {
// 	return;
// };
