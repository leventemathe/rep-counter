import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { PageHeader } from 'antd';

import ExerciseContext from '../../stores';
import deleteExercise from '../../networking/exercises/deleteExercise';
import saveSession from '../../networking/exercises/saveSession';

import Page from './Page';
import NetworkingButton from '../ui/NetworkingButton';
import AddButton from '../ui/AddButton';
import ExerciseControllerGroup from '../exerciseControls/ExerciseControllerGroup';

const DeleteButton = styled(NetworkingButton)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const AddSetButton = styled(AddButton)`
  margin: 16px 0;
`;

const SetArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &>div {
    width: 100%;
  }
`;

const SaveButton = styled(NetworkingButton)`
  margin: 32px auto;
  display: block;
`;

export default withRouter(({ history }) => {
  const { exerciseStore } = useContext(ExerciseContext);
  const { currentExercise } = exerciseStore;

  const onDeleteFailed = error => {
    // TODO: pop a modal
    console.error(error);
  };

  const onSaveFailed = error => {
    // TODO: pop a modal
    console.error(error);
  };

  const goBack = () => {
    exerciseStore.currentExercise = null;
    history.goBack();
  };

  const [sets, setSets] = useState([{
    weight: (currentExercise && currentExercise.weight) || 0,
    reps: 0,
  }]);

  const createNewSet = () => ({ ...(sets[sets.length - 1]) });

  /**
   *
   * @param {number} setIndex the index of the set in the sets array
   * @param {amount} amount the negative or positive amount to be added
   * @param {string} value what are we adding the amount to? reps or weight
   */
  const adjustSet = (setIndex, amount, value) => {
    const currentSet = sets[setIndex];
    if (!currentSet) return;

    const newAmount = currentSet[value] + amount;
    const newSet = { ...currentSet, [value]: newAmount };

    const newSets = [...sets];
    newSets[setIndex] = newSet;
    setSets(newSets);
  };

  const addSet = () => {
    setSets([createNewSet(), ...sets]);
  };

  if (!currentExercise) {
    history.push('/');
    return null;
  }

  return (
    <Page>
      <PageHeader
        className="site-page-header"
        onBack={goBack}
        title={(currentExercise.name) || 'Exercise'}
      />
      <DeleteButton
        buttonProps={{
          danger: true,
        }}
        text="Delete"
        loadingText="Deleting"
        action={async () => deleteExercise(currentExercise.name)}
        onNetworkError={onDeleteFailed}
        onNetworkResourceLoaded={goBack}
      />

      {sets.map((_set, index) => (
        <SetArea key={sets.length - index - 1}>
          {index === 0 && <AddSetButton onClick={addSet} />}
          <ExerciseControllerGroup index={index} sets={sets} unit={exerciseStore.unit} adjustSet={adjustSet} />
        </SetArea>
      ))}

      <SaveButton
        buttonProps={{
          size: 'large',
          type: 'primary',
          shape: 'round',
        }}
        text="Save"
        loadingText="Saving"
        action={async () => saveSession(currentExercise.name, { sets })}
        onNetworkError={onSaveFailed}
        onNetworkResourceLoaded={goBack}
      />
    </Page>
  );
});
