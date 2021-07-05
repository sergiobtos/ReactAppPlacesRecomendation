import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

import './PlaceForm.css';

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

const UpdatePlace = () => {
    const [isLoading, setIsLoading]= useState(true);
    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm({
        title: 
        {value: "", isValid: false},
        description:
        {value: "", isValid:false} 
    }, false);

    const IdentifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(()=> {
        if(IdentifiedPlace){
            setFormData({
                title: 
                {value: IdentifiedPlace.title, isValid: true},
                description:
                {value: IdentifiedPlace.description, isValid:true} 
            }, true);
        }
        setIsLoading(false);
    }, [setFormData, IdentifiedPlace]);
    
    
    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log (formState.inputs);
    }

    if(!IdentifiedPlace){
        return (
            <div className="center">
                <Card>
                <h2> Could not find place!</h2>
                </Card>
            </div>
        );
    }

    if(isLoading){
        return (
            <div className="center">
                <h2> Loading....</h2>
            </div>
        );
    }

    return (
        
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input 
            id="title" 
            element="input" 
            type="text" 
            label="Title"
            validators={[VALIDATOR_REQUIRE]} 
            errorText="Please enter a valid title." 
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}/>
            <Input 
            id="description" 
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]} 
            errorText="Please enter a valid description (at least 5 characters)." 
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}/>
            <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
    );
};

export default UpdatePlace;