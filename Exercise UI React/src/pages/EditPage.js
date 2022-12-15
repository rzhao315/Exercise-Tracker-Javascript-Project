import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditPage = ({ exercise }) => {
 
    const [name, setName]         = useState(exercise.name);
    const [reps, setRep]          = useState(exercise.reps);
    const [weight, setWeight]     = useState(exercise.weight);
    const [unit, setUnit]         = useState(exercise.unit);
    const [date, setDate]         = useState(exercise.date);
    
    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name,
                reps: reps,
                weight: weight, 
                unit: unit, 
                date: date 
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited exercise!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to edit exercise. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }
    return (
        <div className="App">
          <h2>Edit Exercise</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            value={reps}
            onChange={(e) => setRep(e.target.value)}
          />
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="lbs">lbs</option>
            <option value="kgs">kgs</option>
            <option value="miles">miles</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={editExercise}>Save</button>
        </div>
      );
    };
export default EditPage;