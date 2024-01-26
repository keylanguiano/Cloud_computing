document.addEventListener ('DOMContentLoaded', () => 
{
    loadData ()
})

const loadData = async () =>
{
    const url = 'https://watchmode.p.rapidapi.com/releases';
    const options = 
    {
        method: 'GET',
        headers: 
        {
            'X-RapidAPI-Key': '45cf0211bcmsh0589a4825f10fa0p1621a8jsn6a0a576cca26',
            'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
        }
    };

    try 
    {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('@ Keyla ', result);
    } 
    catch (error) 
    {
        console.error(error);
    }
}