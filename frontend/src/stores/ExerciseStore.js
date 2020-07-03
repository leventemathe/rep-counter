import { observable, decorate } from 'mobx';

import Units from '../constants/Units';

export default class ExerciseStore {
  currentExercise;

  unit = Units.METRIC;
}

decorate(ExerciseStore, {
  currentExercise: observable,
  unit: observable,
});
