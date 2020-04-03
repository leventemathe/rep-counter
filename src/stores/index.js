import { createContext } from 'react';

import ExerciseStore from './ExerciseStore';

export default createContext({
  exerciseStore: new ExerciseStore(),
});
