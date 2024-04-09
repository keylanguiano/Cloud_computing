const searchContainer = document.getElementById ('search')
const btnIcon = document.getElementById ('icon_search')
const inputSearch = document.getElementById ('input_search')
const businessContainer = document.getElementById ('business')
const businessCard = document.getElementById ('business_card').content
const details = document.getElementById ('businessDetails')
const businessDetails = document.getElementById ('business_details').content
const fragment = document.createDocumentFragment ()

let business = []

btnIcon.addEventListener ('click', async () => 
{
    if (inputSearch.value.trim().length > 0) 
    {
        business = await search (inputSearch.value)

        await dibujarNegocios (business)
        
        window.location.href = '#business'

        console.log('@ Keyla => business', business)
    }
})

const dibujarNegocios = negocios =>
{
    businessContainer.innerHTML = ''

    const cardTitulo = document.createElement('p');
    cardTitulo.textContent = 'RESULTS';
    cardTitulo.id = 'card_titulo';
    cardTitulo.classList.add('card-titulo');
    businessContainer.appendChild(cardTitulo);
    const cardHr = document.createElement('hr');
    cardHr.id = 'card-hr';
    cardHr.classList.add('hr', 'card-hr');
    cardHr.style.visibility = 'visible';
    businessContainer.appendChild(cardHr);

    negocios.forEach( (item) => 
    {
        const clone = businessCard.cloneNode(true);

        const imgElement = clone.querySelector('img');
        const imageUrl = item.photos_sample[0]?.photo_url_large;
        imgElement.setAttribute('src', imageUrl);
        imgElement.onerror = function() 
        {
            imgElement.src = '../ASSETS/not_image.jpeg';
        };
        clone.querySelector('#card_negocio').textContent = item.name || 'N/A';
        clone.querySelector('#card_tipo').textContent = item.type;
        clone.querySelector('#btnCard').dataset.id = item.business_id;

        const btnCard = clone.querySelector('#btnCard');

        btnCard.addEventListener('click', async () => 
        {
            console.log('click');
            searchContainer.style.display = 'none';
            businessContainer.style.display = 'none';

            window.location.href = '#container';

            console.log('@ Keyla => id', item.business_id);

            await itemDetails(item.business_id);

            
        });

    fragment.appendChild(clone);
    });
    
    businessContainer.appendChild(fragment);
};


const itemDetails = async (id) =>
{
    details.innerHTML = '';

    console.log('id', id);

    const url = `https://local-business-data.p.rapidapi.com/business-details?business_id=${id}&extract_emails_and_contacts=true&extract_share_link=false&language=en`;
    const options = 
    {
        method: 'GET',
        headers: 
        {
            'X-RapidAPI-Key': '45cf0211bcmsh0589a4825f10fa0p1621a8jsn6a0a576cca26',
            'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
        }
    };

    try 
    {
        
        const response = await fetch(url, options);
        const result = await response.json();
        
        console.log('@ Keyla => details', result.data[0]);

        await detalles (result.data[0])
        
        /*
        const url = '../API/business.json'
        const response = await fetch(url);
        const result = await response.json();
        
        console.log('@ Keyla => details', result);
        
        await detalles(result.find(item => item.business_id === id));*/

    } 
    catch (error) 
    {
        console.error(error);
    }
}

const detalles = item =>
{
    console.log ('@ Keyla => detalles ', item);

    details.innerHTML = '';
    
    const clone = businessDetails.cloneNode (true);
    
    console.log('dato: ', typeof item);
    console.log('item: ', item);

    const imgElement = clone.querySelector('img');
    const imageUrl = item.photos_sample[0]?.photo_url_large;
    imgElement.setAttribute('src', imageUrl);
    imgElement.onerror = function() 
    {
        imgElement.src = '../ASSETS/not_image.jpeg';
    };
    clone.querySelector ('#poster_nombre').textContent = item.name ? item.name : "";
    clone.querySelector ('#poster_tipo').textContent = item.type ? item.type : "";
    clone.querySelector ('#poster_puntuacion').textContent = item.rating ? item.rating + " 📊 ( " + item.review_count + " )" : "";
    clone.querySelector ('#poster_estrellas').textContent = item.hotel_stars != 1 ? item.hotel_stars + " estrellas" : item.hotel_stars + "estrella";
    
    clone.querySelector ('#poster_direccion').textContent = item.address ? "📍 " + item.address : "";
    clone.querySelector ('#poster_numero').textContent = "📱 " + item.phone_number ? item.phone_number : "";

    clone.querySelector ('#poster_descripcion').textContent = item.about.summary ? item.about.summary : "";

    clone.querySelector ('#poster_puntuacion_5').textContent = item.reviews_per_rating?.["5"] ? "5 ⭐️: " + item.reviews_per_rating["5"] : "5 ⭐️: 0";
    clone.querySelector ('#poster_puntuacion_4').textContent = item.reviews_per_rating?.["4"] ? "4 ⭐️: " + item.reviews_per_rating["4"] : "4 ⭐️: 0";
    clone.querySelector ('#poster_puntuacion_3').textContent = item.reviews_per_rating?.["3"] ? "3 ⭐️: " + item.reviews_per_rating["3"] : "3 ⭐️: 0";
    clone.querySelector ('#poster_puntuacion_2').textContent = item.reviews_per_rating?.["2"] ? "2 ⭐️: " + item.reviews_per_rating["2"] : "2 ⭐️: 0";
    clone.querySelector ('#poster_puntuacion_1').textContent = item.reviews_per_rating?.["1"] ? "1 ⭐️: " + item.reviews_per_rating["1"] : "1 ⭐️: 0";
    clone.querySelector ('#poster_puntuacion_total').textContent = item.review_count + " opinions";

    clone.querySelector ('#poster_calificacion_habitaciones').textContent = item.hotel_review_summary.Rooms.score ? item.hotel_review_summary.Rooms.score +  " ⭐️" : "0 ⭐️";
    clone.querySelector ('#poster_opinion_habitaciones').textContent = item.hotel_review_summary.Rooms.summary ? item.hotel_review_summary.Rooms.summary[0]: "";
    clone.querySelector ('#poster_calificacion_ubicacion').textContent = item.hotel_review_summary.Location.score ? item.hotel_review_summary.Location.score +  " ⭐️" : "0 ⭐️";
    clone.querySelector ('#poster_opinion_ubicacion').textContent = item.hotel_review_summary.Location.summary ? item.hotel_review_summary.Location.summary[0]: "";
    clone.querySelector ('#poster_calificacion_servicios').textContent = item.hotel_review_summary?.["Service & facilities"].score ? item.hotel_review_summary?.["Service & facilities"].score +  " ⭐️" : "0 ⭐️";
    clone.querySelector ('#poster_opinion_servicios').textContent = item.hotel_review_summary?.["Service & facilities"].summary ? item.hotel_review_summary?.["Service & facilities"].summary[0]: "";

    const btnBack = clone.querySelector ('#btnPoster');

    btnBack.addEventListener ('click', () =>
    {
        details.innerHTML = '';
        console.log ('de regreso');
        
        businessContainer.style.display = 'flex';
        searchContainer.style.display = 'flex';

        window.location.href = '#business'
    })
    
    fragment.appendChild (clone)
    details.appendChild (fragment)
}