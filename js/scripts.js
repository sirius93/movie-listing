(()=>{
    const config = {
        apiUrl : 'http://starlord.hackerearth.com/movieslisting',
        labels : {
            heading : 'Movie Listing Api',
            movieTitle : 'Movie Title',
            directrName : 'Director',
            actorLead : 'Actor 1',
            actorSubLead : 'Actor 2',
            genre : 'Movie Genre',
            language : 'Movie Language',
            country : 'Release Country',
            rating : 'Rating',
            budget : 'Total Budget',
            Year : 'Release Year',
            keyWords:  'KeyWords',
            imdbUrl : 'IMDB URL'
        }
    }
    function fetchData(){
        return (fetch(config.apiUrl).then(
            data => data.json()
        ))
    }

    let movieData = fetchData()
    movieData.then(data=> renderList(data));

    let searchbutton = document.getElementById('search-button');
    searchbutton.addEventListener('click', function(e){
        e.preventDefault();
        var targetForm = event.target.parentNode,
            SearchValue = targetForm.elements[0].value;
            fetchData().then(
                data => RenderSearch(data,SearchValue)
        )
    })
    function RenderSearch(data,SearchValue){
        var filterResult = data.filter(d => d.movie_title.indexOf(SearchValue)===0);
        renderList(filterResult);
    }
    
    function renderList(data){
        var template = document.getElementById('movie-list'),
            listContainer = document.getElementById('movie-list-container'),
            templateHtml = template ? template.innerHTML : '',
            listHtml = '';
            listContainer.innerHTML = '';
        for(var d in data){
            listHtml += templateHtml
            .replace(/{{movieTitle}}/g, config.labels.movieTitle)
            .replace(/{{movieDirectrName}}/g, config.labels.directrName)
            .replace(/{{movieActorLead}}/g, config.labels.actorLead)
            .replace(/{{movieActorSubLead}}/g, config.labels.actorSubLead)
            .replace(/{{movieGenre}}/g, config.labels.genre)
            .replace(/{{movieLanguage}}/g, config.labels.language)
            .replace(/{{movieCountry}}/g, config.labels.country)
            .replace(/{{movieRating}}/g, config.labels.rating)
            .replace(/{{movieBudget}}/g, config.labels.budget)
            .replace(/{{movieYear}}/g, config.labels.Year)
            .replace(/{{moviekeyWords}}/g, config.labels.keyWords)
            .replace(/{{movieImdbUrl}}/g, config.labels.imdbUrl)
            .replace(/{{movie_title}}/g, data[d].movie_title)
            .replace(/{{director_name}}/g, data[d].director_name)
            .replace(/{{actor_1_name}}/g, data[d].actor_1_name)
            .replace(/{{actor_2_name}}/g, data[d].actor_2_name)
            .replace(/{{genres}}/g, data[d].genres)
            .replace(/{{language}}/g, data[d].language)
            .replace(/{{country}}/g, data[d].country)
            .replace(/{{content_rating}}/g, data[d].content_rating)
            .replace(/{{budget}}/g, data[d].budget)
            .replace(/{{title_year}}/g, data[d].title_year)
            .replace(/{{plot_keywords}}/g, data[d].plot_keywords)
            .replace(/{{movie_imdb_link}}/g, data[d].movie_imdb_link);
        }
        listContainer.innerHTML += listHtml;
    }

})();