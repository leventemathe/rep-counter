import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { PageHeader } from 'antd';
import styled from 'styled-components';

import ExerciseContext from '../../stores';
import deleteExercise from '../../networking/exercises/deleteExercise';

import Page from './Page';
import NetworkingButton from '../ui/NetworkingButton';


const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default withRouter(({ history }) => {
  const { exerciseStore } = useContext(ExerciseContext);
  const { exerciseToEdit } = exerciseStore;

  const goBack = () => {
    exerciseStore.exerciseToEdit = null;
    history.goBack();
  };

  if (!exerciseToEdit) {
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
        title={`Edit ${(exerciseToEdit.name) || 'Exercise'}`}
      />

      <ButtonArea>
        <NetworkingButton
          buttonProps={{
            danger: true,
          }}
          text="Delete"
          loadingText="Deleting"
          action={async () => deleteExercise(exerciseToEdit.name)}
          onNetworkError={onDeleteFailed}
          onNetworkResourceLoaded={goBack}
        />
      </ButtonArea>
    </Page>
  );
});
