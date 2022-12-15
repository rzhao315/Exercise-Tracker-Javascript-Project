import React from 'react';
import ExerciseList from '../components/Table';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { MdAdd } from "react-icons/md";
import "../App.css";

function HomePage({ setExercise }) {
    // Use the history for updating
    const history = useHistory();

    // Use state to bring in the data
    const [exercises, setExercises] = useState([]);

    // RETRIEVE the list of exercises
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    } 
    

    // UPDATE a exercise
    const onEdit = async exercise => {
        setExercise(exercise);
        history.push("/edit-exercise");
    }


    // DELETE a exercise  
    const onDeleteExercise = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204){
            setExercises(exercises.filter(exercise => exercise._id !== _id));
        } else {
            console.error(`Failed to delete exercise with id: ${_id}. Status code = ${response.status}`);
        }
    }

    // LOAD the exercises
    useEffect(() => {
        loadExercises();
    }, []);

    // DISPLAY the exercises
    return (
        <>
            <article>
                <h2>List of your Exercise</h2>
                <p>Below are your current exercise routine</p>
                <ExerciseList 
                    exercises={exercises} 
                    onEdit={onEdit} 
                    onDelete={onDeleteExercise} 
                />
                <div>
                
                <Link to="/create">
                <button className="Add-icon-button">
                    <MdAdd className="Add-icon" />
                    </button>
                </Link>
                
            </div>

                    </article>
        </>
    );
}

export default HomePage;