import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { PageHeader, Button, Typography } from 'antd';

import ExerciseContext from '../../stores';
import deleteExercise from '../../networking/exercises/deleteExercise';

import Page from './Page';
import NetworkingButton from '../ui/NetworkingButton';
import ExerciseController from '../exerciseControls/ExerciseController';
import AddButton from '../ui/AddButton';

const DeleteButton = styled(NetworkingButton)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const AddSetButton = styled(AddButton)`
  margin: 16px 0;
`;

const ExerciseControllerTitle = styled(Typography.Title)`
  padding: 0 !important;
  margin: 0.3rem 0.6rem !important;
  color: white !important;
`;

const TitleArea = styled.div`
  background-color: #1890ff;
  width: 100%;
`;

const SetArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SaveButton = styled(Button)`
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

  const goBack = () => {
    exerciseStore.currentExercise = null;
    history.goBack();
  };

  const createNewSet = () => ({
    weight: (currentExercise && currentExercise.weight) || 0,
    reps: 0,
  });

  const [sets, setSets] = useState([createNewSet()]);

  const add = (a, b) => a + b;
  const subtract = (a, b) => a - b;

  const adjustSet = (setIndex, amount, value, operation) => {
    const currentSet = sets[setIndex];
    if (!currentSet) return;

    const newAmount = operation(currentSet[value] + amount);
    const newSet = { ...currentSet, [value]: newAmount };

    const newSets = [...sets];
    newSets[setIndex] = newSet;
    setSets(newSets);
  };

  const incrementRep = (setIndex, amount) => {
    adjustSet(setIndex, amount, 'reps', add);
  };

  const decrementRep = (setIndex, amount) => {
    adjustSet(setIndex, amount, 'reps', subtract);
  };

  const incrementWeight = (setIndex, amount) => {
    adjustSet(setIndex, amount, 'weight', add);
  };

  const decrementWeight = (setIndex, amount) => {
    adjustSet(setIndex, amount, 'weight', subtract);
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
        action={async () => deleteExercise(currentExercise.id)}
        text="Delete"
        loadingText="Deleting"
        onNetworkError={onDeleteFailed}
        onNetworkResourceLoaded={goBack}
      />

      {sets.map((set, index) => (
        <SetArea key={sets.length - index - 1}>
          {index === 0 && <AddSetButton onClick={addSet} />}

          <TitleArea>
            <ExerciseControllerTitle level={3}>{`Set ${sets.length - index}`}</ExerciseControllerTitle>
          </TitleArea>

          <ExerciseController
            title="Reps"
            playAnimation={sets.length > 1 && index === 0}
          />
          <ExerciseController
            title={`Weight (${exerciseStore.unit})`}
            playAnimation={sets.length > 1 && index === 0}
            border
          />
        </SetArea>
      ))}

      <SaveButton size="large" type="primary" shape="round">Save</SaveButton>
    </Page>
  );
});
