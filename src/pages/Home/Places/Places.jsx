import React from 'react';
import { Link } from 'react-router-dom';

const Places = ({ place }) => {
    const { id, name, img } = place;
    return (
        <Link to={`/destination/${id}`}>
            <div className='relative border rounded'>
                <img style={{ width: '450px', height: '250px' }} src={img} alt="place photo" />
                <h2 className='absolute bottom-4 left-4 text-4xl z-10 text-white font-extrabold'>{name}</h2>
            </div>
        </Link>
    );
};

export default Places;