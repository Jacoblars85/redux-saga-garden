import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const plantList = useSelector(store => store.plantList);

    useEffect(() => {
        getPlants()
    }, []);

    const getPlants = () => {
        dispatch({
            type: 'SAGA_GET_PLANTS'
        })

    }

    return (
        <div>
            <h3>This is the plant list</h3>

            {plantList.map((plant) => {
                return (
                    <div key={plant.id}>
                        <ul>
                            {plant.name}

                        </ul>
                    </div>
                )
            })
            }
        </div>
    );
}

export default PlantList;
