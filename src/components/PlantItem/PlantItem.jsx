import React from 'react';
import { useDispatch } from 'react-redux';

function PlantItem({ plant }) {

    const dispatch = useDispatch();

    const removePlant = () => {
        dispatch({
            type: 'SAGA_DELETE_PLANT',
            payload: plant.id
        })
    }

    return (
        <ul>
            {plant.name}

            <button onClick={removePlant}>delete</button>

        </ul>
    )
}

export default PlantItem;