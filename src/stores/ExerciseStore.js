import { observable, decorate } from 'mobx';

export const Units = {
  METRIC: 'kg',
  IMPERIAL: 'lbs',
};

export default class ExerciseStore {
  currentExercise;

  unit = Units.METRIC;
}

decorate(ExerciseStore, {
  currentExercise: observable,
  unit: observable,
});
