import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: "Empire States",
        description: "One of the most famous sky buildings",
        imageUrl: 'https://content.tripster.com/travelguide/wp-content/uploads/2017/09/Dropbox_Empire-State-ThinkstockPhotos-486334510-med-2.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: "Empire States",
        description: "One of the most famous sky buildings",
        imageUrl: 'https://content.tripster.com/travelguide/wp-content/uploads/2017/09/Dropbox_Empire-State-ThinkstockPhotos-486334510-med-2.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
];

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={ loadedPlaces} />
};

export default UserPlaces;