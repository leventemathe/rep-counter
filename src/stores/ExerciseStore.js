import { observable, decorate } from 'mobx';

export default class ExerciseStore {
  currentExercise;
}

decorate(ExerciseStore, {
  currentExercise: observable,
});
