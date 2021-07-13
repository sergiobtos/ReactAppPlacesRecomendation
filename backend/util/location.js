const axios = require('axios');
const HttpError = require('../models/http-error');

//const API_KEY = 'AIzaSyDsWYEJ6ghdqXanl94CCtyhHaxEvp0PlfY';

async function getCoordsForAddress (address){
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address)}&key=${process.env.API_KEY}`
        );
    const data = response.data; 

    if(!data || data.status === 'ZERO_RESULTS' || data.status === 'REQUEST_DENIED'){
        const error = new HttpError('Could not find location for the specified address', 422);
        throw error;
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
};

module.exports = getCoordsForAddress;