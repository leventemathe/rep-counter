import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { PageHeader } from 'antd';
import styled from 'styled-components';

import ExerciseContext from '../../stores';
import deleteExercise from '../../networking/exercises/deleteExercise';

import updateExercise from '../../networking/exercises/updateExercise';
import Page from './Page';
import NetworkingButton from '../ui/NetworkingButton';
import ExerciseForm from '../forms/ExerciseForm';


const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 64px;
`;

export default withRouter(({ history }) => {
  const { exerciseStore } = useContext(ExerciseContext);
  const { currentExercise } = exerciseStore;

  const goBack = () => {
    exerciseStore.currentExercise = null;
    history.goBack();
  };

  if (!currentExercise) {
    history.push('/');
    return null;
  }

  const onDeleteFailed = error => {
    // TODO: pop a modal
    console.error(error);
  };

  return (
    <Page>
      <PageHeader
        className="site-page-header"
        onBack={goBack}
        title={`Edit ${(currentExercise.name) || 'Exercise'}`}
      />

      <ExerciseForm
        initialValues={{
          name: currentExercise.name,
          description: currentExercise.description,
          category: currentExercise.categories && currentExercise.categories[0],
        }}
        action={async exercise => {
          await updateExercise(currentExercise.id, exercise);
          history.goBack();
        }}
      />

      <ButtonArea>
        <NetworkingButton
          buttonProps={{
            danger: true,
          }}
          text="Delete Exercise"
          loadingText="Deleting"
          action={async () => deleteExercise(currentExercise.id)}
          onNetworkError={onDeleteFailed}
          onNetworkResourceLoaded={goBack}
        />
      </ButtonArea>
    </Page>
  );
});
