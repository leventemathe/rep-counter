import { createContext } from 'react';

import ExerciseStore from './ExerciseStore';
import AuthStore from './AuthStore';
import UIStore from './UIStore';

export default createContext({
  exerciseStore: new ExerciseStore(),
  authStore: new AuthStore(),
  uiStore: new UIStore(),
});
