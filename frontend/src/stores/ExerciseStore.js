import { observable, decorate } from 'mobx';

import Units from '../constants/Units';

export default class ExerciseStore {
  currentExercise;

  exerciseToEdit;

  unit = Units.METRIC;
}

decorate(ExerciseStore, {
  currentExercise: observable,
  exerciseToEdit: observable,
  unit: observable,
});
