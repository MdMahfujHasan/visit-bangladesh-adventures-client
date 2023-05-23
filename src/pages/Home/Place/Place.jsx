import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Place = () => {
    const place = useLoaderData();
    console.log(place)
    const { name, price, img, description } = place;
    return (
        <div className='flex flex-col justify-center items-center mt-12'>
            <img className='rounded-lg' style={{ width: '600px' }} src={img} alt="place photo" />
            <h2 className='absolute bottom-36 text-5xl text-white font-extrabold'>{name}</h2>
            <h3 className='text-2xl'><b>Price: </b>${price}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Place;