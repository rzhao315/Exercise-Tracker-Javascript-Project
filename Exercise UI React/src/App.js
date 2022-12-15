// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

// Define the function that renders the content in routes using State.
function App() {

  const [exercise, setExercise] = useState([]);

  return (
    <>
      <Router>

          <header>
            <h1>Workout/Exercise Tracker</h1>
            <p>Full Stack MERN App Demo</p>
          </header>

          <Navigation />

          <main>
            <Route path="/" exact>
              <HomePage setExercise={setExercise} />
            </Route>

            <Route path="/create">
              <CreatePage />
            </Route>
            
            <Route path="/edit-exercise">
              <EditPage exercise={exercise} />
            </Route>
          </main>

          <footer>
            <p>Ray Zhao © 2022 </p>
          </footer>

      </Router>
    </>
  );
}

export default App;