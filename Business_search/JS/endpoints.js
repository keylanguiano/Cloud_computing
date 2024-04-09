const search = async (business) => 
{
    const url =`https://local-business-data.p.rapidapi.com/search?query=${business}&limit=50&language=en`;
    const options = 
    {
        method: 'GET',
        headers: 
        {
            'X-RapidAPI-Key': '45cf0211bcmsh0589a4825f10fa0p1621a8jsn6a0a576cca26',
            'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
        }
    }
	try 
    {
        /*
		const url = '../API/business.json'
		const response = await fetch(url);
		const result = await response.json();
		return result*/
        

        const response = await fetch(url, options);
        const result = await response.json();
        console.log('@ Keyla => search ', result.data);
        return result.data;
	} 
    catch (error) 
    {
		console.error(error);
	}
}