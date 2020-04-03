import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import ExerciseListPage from '../pages/ExerciseListPage';
import ExercisePage from '../pages/ExercisePage';
import NewExercisePage from '../pages/NewExercisePage';

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <ExerciseListPage />
      </Route>
      <Route path="/exercise/new" exact>
        <NewExercisePage />
      </Route>
      <Route path="/exercise/:id" exact>
        <ExercisePage />
      </Route>
    </Switch>
  </Router>
);
