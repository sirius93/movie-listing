(()=>{
    const config = {
        apiUrl : 'http://starlord.hackerearth.com/movies',
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
    let toggleButton = document.getElementById("toggle-button");
    toggleButton.addEventListener("click",toggleDarkLight)

    function toggleDarkLight() {
        var body = document.getElementById("body");
        var currentClass = body.className;
        body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    }

    function fetchData(){
        return (fetch(config.apiUrl).then(
            data => data.json()
        ))
    }
    if(window.sessionStorage.getItem('prev_page') == "null"){
        document.getElementById('pagination-previous').style.display = "none"
    }

    fetchData().then(data => renderList(Paginator(data,1)));

    function Paginator(items, page, per_page) {
        console.log(page)
        var page = page || 1,
        per_page = per_page || 10,
        offset = (page - 1) * per_page,
       
        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
        return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? parseInt(page) + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
        };
      }
    
    let prev_page =  document.getElementById("pagination-previous");
    let next_page =  document.getElementById("pagination-next");

    prev_page.addEventListener('click', function(){
        let page = window.sessionStorage.getItem("prev_page");
        if(page !== "null"){
            fetchData().then(data => renderList(Paginator(data,page)));
        }
    },false)

    next_page.addEventListener('click', function(){
        let page = window.sessionStorage.getItem("next_page");
        if(page !== "null"){
            fetchData().then(data => renderList(Paginator(data,page)));
            document.getElementById('pagination-previous').style.display = "inline"
        }
    },false)

    function renderList(data){
        console.log(data)
        var template = document.getElementById('movie-list'),
            templateHeader = document.getElementById('movie-list-header'),
            listContainer = document.getElementById('movie-list-container'),
            templateHtml = template ? template.innerHTML : '',
            headerTemplateHtml = templateHeader ? templateHeader.innerHTML : '',
            listHtml = '';
            headerHTML = '';
            listContainer.innerHTML = '';
            headerHTML += headerTemplateHtml
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
            .replace(/{{movieImdbUrl}}/g, config.labels.imdbUrl);
            listContainer.innerHTML += headerHTML;    
        for(var d in data.data){
            listHtml += templateHtml
            .replace(/{{movie_title}}/g, data.data[d].movie_title)
            .replace(/{{director_name}}/g, data.data[d].director_name)
            .replace(/{{actor_1_name}}/g, data.data[d].actor_1_name)
            .replace(/{{actor_2_name}}/g, data.data[d].actor_2_name)
            .replace(/{{genres}}/g, data.data[d].genres.split('|')[1])
            .replace(/{{language}}/g, data.data[d].language)
            .replace(/{{country}}/g, data.data[d].country)
            .replace(/{{content_rating}}/g, data.data[d].content_rating)
            .replace(/{{budget}}/g, data.data[d].budget)
            .replace(/{{title_year}}/g, data.data[d].title_year)
            .replace(/{{plot_keywords}}/g, data.data[d].plot_keywords.split('|')[1])
            .replace(/{{movie_imdb_link}}/g, data.data[d].movie_imdb_link);
        }
        listContainer.innerHTML += listHtml;
        window.sessionStorage.setItem("next_page",data.next_page)
        window.sessionStorage.setItem("prev_page",data.pre_page)
    }

})();