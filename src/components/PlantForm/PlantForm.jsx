import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const PlantForm = () => {
    const dispatch = useDispatch();

    //Initial state is an OBJECT, with keys id and name
    let [newName, setName] = useState('');
    let [newKingdom, setKingdom] = useState('');
    let [newClade, setClade] = useState('');
    let [newOrder, setOrder] = useState('');
    let [newFamily, setFamily] = useState('');
    let [newSubfamily, setSubfamily] = useState('');
    let [newGenus, setGenus] = useState('');

    const handleNameChange = (event) => {
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({ ...newPlant, name: event.target.value })
    }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({
            type: 'SAGA_POST_PLANTS',
            payload: {
                name: newName,
                kingdom: newKingdom,
                clade: newClade,
                order: newOrder,
                family: newFamily,
                subfamily: newSubfamily,
                genus: newGenus
            }
        })
    }
    return (
        <div>
            <h3>This is the form</h3>
            <form onSubmit={addNewPlant}>

                <input type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={newName} />

                <input type="text"
                    placeholder="Kingdom"
                    onChange={(e) => setKingdom(e.target.value)}
                    value={newKingdom} />

                <input type="text"
                    placeholder="Clade"
                    onChange={(e) => setClade(e.target.value)}
                    value={newClade} />

                <input type="text"
                    placeholder="Order"
                    onChange={(e) => setOrder(e.target.value)}
                    value={newOrder} />

                <input type="text"
                    name="Family"
                    placeholder="Enter"
                    onChange={(e) => setFamily(e.target.value)}
                    value={newFamily} />

                <input type="text"
                    placeholder="Subfamily"
                    onChange={(e) => setSubfamily(e.target.value)}
                    value={newSubfamily} />

                <input type="text"
                    placeholder="Genus"
                    onChange={(e) => setGenus(e.target.value)}
                    value={newGenus} />


                <input type='submit' value='Add New Plant' />

            </form>
        </div>
    );
}


export default PlantForm;
