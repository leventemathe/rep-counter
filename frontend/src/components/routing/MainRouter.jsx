import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import ExerciseListPage from '../pages/ExerciseListPage';
import ExerciseSessionPage from '../pages/ExerciseSessionPage';
import NewExercisePage from '../pages/NewExercisePage';
import EditExercisePage from '../pages/EditExercisePage';
import SessionsPage from '../pages/SessionsPage';

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
        <ExerciseSessionPage />
      </Route>
      <Route path="/exercise/edit/:id" exact>
        <EditExercisePage />
      </Route>
      <Route path="/exercise/sessions/:id" exact>
        <SessionsPage />
      </Route>
    </Switch>
  </Router>
);
