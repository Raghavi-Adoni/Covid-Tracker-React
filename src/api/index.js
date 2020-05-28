import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    try {
        // const response = await axios.get(url);
        // method 1:
        // const {data} = await axios.get(url);

        // const modifiedData = {
        //     confirmed: data.confirmed,
        //     recovered: data.recovered,
        //     deaths: data.deaths,
        //     lastUpdate: data.lastUpdate,
        // }
        // return modifiedData;

         // method 2:
        // const {data: {confirmed,recovered,deaths,lastUpdate}} = await axios.get(url);

        // const modifiedData = {
        //     confirmed: confirmed,
        //     recovered: recovered,
        //     deaths: deaths,
        //     lastUpdate: lastUpdate,
        // }
        // return modifiedData;

        // method 3:
        // const {data: {confirmed,recovered,deaths,lastUpdate}} = await axios.get(url);

        // const modifiedData = {
        //     confirmed,
        //     recovered,
        //     deaths,             
        //     lastUpdate
        // }
        // return modifiedData;

        let changeableUrl = url;
        if(country) {
            changeableUrl = `${url}/countries/${country}`;
        }
        const {data: {confirmed,recovered,deaths,lastUpdate}} = await axios.get(changeableUrl);

        return  {confirmed,recovered,deaths,lastUpdate};

        } 
    catch (error) {

}
}

export const fetchDailyData = async() => {
    try {
        const {data} = await axios.get(`${url}/daily`);
        //returning as an object
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        
    return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async() => {
    try {
        const {data : { countries }} = await axios.get(`${url}/countries`);
        
        console.log(countries.map((country) => country.name));
        return countries.map((country) => country.name);
       
    } catch (error) {
        console.log(error);
    }
}