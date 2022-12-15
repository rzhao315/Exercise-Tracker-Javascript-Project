import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Exercise({ exercises, onDelete, onEdit }) {
    return (
        <tr>
            <td>{exercises.name}</td>
            <td>{exercises.reps}</td>
            <td>{exercises.weight}</td>
            <td>{exercises.unit}</td>
            <td>{exercises.date}</td>
            <td><MdDeleteForever onClick={() => onDelete(exercises._id)} /></td>
            <td><MdEdit onClick={() => onEdit(exercises)} /></td>
        </tr>
    );
}

export default Exercise;