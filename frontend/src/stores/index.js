import { createContext } from 'react';

import ExerciseStore from './ExerciseStore';
import AuthStore from './AuthStore';

export default createContext({
  exerciseStore: new ExerciseStore(),
  authStore: new AuthStore(),
});
