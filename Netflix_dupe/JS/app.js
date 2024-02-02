const boxPopular = document.getElementById ('Box_Popular')
const imgPopular = document.getElementById ('Img_Popular').content
const details = document.getElementById ('movieDetails')
const cardDetails = document.getElementById ('cardDetails').content
const fragment = document.createDocumentFragment ()

let releases

document.addEventListener ('DOMContentLoaded', () => 
{
    loadData ()
})

// Obtiene los resultados de las peliculas
const loadData = async () =>
{
    details.innerHTML = '';

    const url = 'https://watchmode.p.rapidapi.com/releases';
    const options = 
    {
        method: 'GET',
        headers: 
        {
            'X-RapidAPI-Key': '3a16c69830msh9f59b4551a3cbfbp13d67fjsn12dccc6839b5',
            'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
        }
    };

    try 
    {
        const response = await fetch(url, options);
        releases = await response.json();
        createCards ()
        console.log('@ Keyla => ', releases);
    } 
    catch (error) 
    {
        console.error(error);
    }
};

const createCards = () => 
{
    boxPopular.innerHTML = '';

    // El forEach itera un arreglo de igual manera que un ciclo For, por medio de una variable temporal
    releases.releases.forEach ( (movie) =>
    {
        const clone = imgPopular.cloneNode (true);
        
        clone.querySelector ('p'). textContent = movie.title;
        clone.querySelector ('img').setAttribute ('src', movie.poster_url ? movie.poster_url : '../ASSETS/IMAGES/not_image.jpeg');
        clone.querySelector ('button').dataset.id = movie.id;

        const btnCard = clone.querySelector ('button');
        
        btnCard.addEventListener ('click', async () =>
        {
            console.log ('click');
            boxPopular.style.display = 'none';
            await movieDetails (movie.id);
        });

        fragment.appendChild (clone)
    });

    boxPopular.appendChild (fragment)
};

const movieDetails = async (id) =>
{
    details.innerHTML = '';

    const url = `https://watchmode.p.rapidapi.com/title/${id}/details/?language=ES`;
    const options = 
    {
        method: 'GET',
        headers: 
        {
            'X-RapidAPI-Key': '3a16c69830msh9f59b4551a3cbfbp13d67fjsn12dccc6839b5',
            'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
        }
    };

    try 
    {
        const response = await fetch(url, options);
        const result = await response.json();
        await detalles (result)
        console.log('@ Keyla => movies', result);
    } 
    catch (error) 
    {
        console.error(error);
    }
}

const detalles = movie =>
{
    console.log ('@ Keyla => details ', movie);

    details.innerHTML = '';
    
    const clone = cardDetails.cloneNode (true);
    
    clone.querySelector ('#poster_titulo').textContent = movie.title;
    clone.querySelector ('#poster_img').setAttribute ('src', movie.poster ? movie.poster : '../ASSETS/IMAGES/not_image.jpeg');
    clone.querySelector ('#poster_genero').textContent = movie.genre_names ? "• " + movie.genre_names : "";
    clone.querySelector ('#poster_anio').textContent = movie.year ? "• " + movie.year : "";
    clone.querySelector ('#poster_minutos').textContent = movie.runtime_minutes ? "• " + movie.runtime_minutes + " Minutos" : "";
    clone.querySelector ('#poster_tipo').textContent = movie.type;
    clone.querySelector ('#poster_sinopsis').textContent = movie.plot_overview;

    const btnBack = clone.querySelector ('#btnPoster');

    btnBack.addEventListener ('click', () =>
    {
        details.innerHTML = '';
        console.log ('de regreso');
        boxPopular.style.display = 'flex';
        loadData ();
    })
    
    fragment.appendChild (clone)
    details.appendChild (fragment)
}