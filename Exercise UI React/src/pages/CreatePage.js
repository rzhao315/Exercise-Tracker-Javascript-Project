import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreatePage = () => {

    const [name, setName]         = useState('');
    const [reps, setRep]          = useState('');
    const [weight, setWeight]     = useState('');
    const [unit, setUnit]         = useState('');
    const [date, setDate]         = useState('');
    
    const history = useHistory();

    const createExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <div className="App">
          <h2>Create Exercise</h2>
            <p>Please add your exercise routine</p>
          <input
            type="text"
            placeholder="Exercise name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            min="1"
            placeholder="# of reps"
            value={reps}
            required
            onChange={(e) => setRep(e.target.value)}
          />
          <input
            type="number"
            min="1"
            placeholder="Weight/Distance"
            value={weight}
            required
            onChange={(e) => setWeight(e.target.value)}
          />
            <input
                type="text"
                placeholder="lbs/kgs/miles"
                value={unit}
                required
                onChange={e => setUnit(e.target.value)} />
          <input
            type="date"
            value={date}
            required 
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={createExercise}>Create</button>
        </div>
      );
    };

export default CreatePage;