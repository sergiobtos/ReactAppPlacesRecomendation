const HttpError = require('../models/http-error');
const { v4 : uuid} = require ('uuid');
const { validationResult } = require('express-validator'); 

const getCoordsForAddress = require('../util/location');

let DUMMY = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    }

];

const getPlaceById = (req, res, next)=>{
    const placeId = req.params.pid;
    const place = DUMMY.find(p => {return p.id === placeId});
    if(!place){
        return next(new HttpError( 'Could not find a place for the provided place id.', 404));
    }
    res.json({place});
};

const getPlacesByUserId = (req, res, next)=>{
    const userId = req.params.uid;
    const places = DUMMY.filter(p => {return p.creator === userId});
    if(!places || places.length === 0){
        return next(new HttpError( 'Could not find a places for the provided user id.', 404));
    }
    res.json({places});
};

const createPlace =  async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        next(new HttpError('Invalid inputs passed, please check your data',422));
    }
    const {title, description, address, creator} = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address); 
    } catch (error) {
        return next(error);
    }
    
    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };


    DUMMY.push(createdPlace);
    res.status(201).json({place: createdPlace});
};

const updatePlace = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs passed, please check your data',422);
    }
    const {title, description} = req.body;
    const placeId = req.params.pid;

    const updatedPlace = {...DUMMY.find(p => p.id === placeId)};
    const placeIndex = DUMMY.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});
};

const deletePlace = (req, res, next)=>{
    const placeId = req.params.pid;
    if(!DUMMY.find(p => p.id === placeId)){
        throw new HttpError('Could not find a place for that Id', 404);
    }
    DUMMY = DUMMY.filter(p=> p.id !==placeId);
    res.status(200).json({message: 'Deleted place.'});

};

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;