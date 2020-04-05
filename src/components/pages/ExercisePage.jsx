import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { PageHeader } from 'antd';

import ExerciseContext from '../../stores';
import deleteExercise from '../../networking/exercises/deleteExercise';

import Page from './Page';
import NetworkingButton from '../ui/NetworkingButton';

const DeleteButton = styled(NetworkingButton)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export default withRouter(({ history }) => {
  const { exerciseStore } = useContext(ExerciseContext);

  const onDeleteFailed = error => {
    // TODO: pop a modal
    console.error(error);
  };

  const onDeletion = () => history.goBack();

  return (
    <Page>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title={exerciseStore.currentExercise || 'Exercise'}
      />
      <DeleteButton
        buttonProps={{
          danger: true,
        }}
        // TODO: pass actual id
        action={async () => deleteExercise(0)}
        text="Delete"
        loadingText="Deleting"
        onNetworkError={onDeleteFailed}
        onNetworkResourceLoaded={onDeletion}
      />
    </Page>
  );
});
