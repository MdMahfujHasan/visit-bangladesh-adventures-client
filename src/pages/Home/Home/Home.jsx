import React from 'react';
import Places from '../Places/Places';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const places = useLoaderData();
    console.log(places)
    return (
        <div className='grid grid-cols-2 w-3/5 mx-auto mt-6 gap-4'>
            {
                places.map(place => <Places key={place.id} place={place}></Places>)
            }
        </div>
    );
};

export default Home;