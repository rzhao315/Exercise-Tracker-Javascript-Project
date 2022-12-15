import 'dotenv/config';
import express from 'express';
import * as exercises from './exercise_model.mjs';


const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// CREATE controller ******************************************
app.post ('/exercises', (req,res) => { 
    exercises.createExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
        )
        .then(exercise => {
        if(req.body.name !== "" && typeof req.body.name === "string" && req.body.reps > 1 && req.body.weight > 1 && req.body.unit === 'lbs' && req.body.unit === 'kgs' && req.body.unit === 'miles'){
            res.status(201).json(exercise)}
        // else if (req.body.reps > 1 && req.body.weight > 1)
        // {res.status(201).json(exercise)}
        // else if (req.body.unit === 'lbs' && req.body.unit === 'kgs' && req.body.unit === 'miles' )
        // {res.status(201).json(exercise)}
        
        else{
            res.status(400).json({ Error: "Invalid request" });
        }
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: "Invalid request" });
        });
});


// RETRIEVE controller ****************************************************

// GET exercises of a JSON array containing the entire collection
app.get(
    "/exercises", (req, res) => {
      const filter = {};
      exercises.findExercises(filter).then(exercise => {
        res.status(200).json(exercise);
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ Error: 'Request failed' });
    });
    
    });


// GET exercises by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Not found' });
            }         
         })
        .catch(error => {
            console.log(error)
            res.status(400).json({ Error: 'Request to retrieve document failed' });
        });

});


// UPDATE exercise ************************************
// Exercise parameter filter by id 
app.put('/exercises/:_id', (req, res) => {
    exercises.updateExercise(
        req.params._id,
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
    )
    .then(modifiedCount => {
        if (modifiedCount === 1) {
            res.json({ 
                _id: req.params._id, 
                name: req.body.name, 
                reps: req.body.reps, 
                weight: req.body.weight,
                unit: req.body.unit,
                date: req.body.date
            })
        } else {
            res.status(404).json({ Error: 'Exercise not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: "Invalid Request"});
    });
});

// DELETE Controller ******************************
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Exercise not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});