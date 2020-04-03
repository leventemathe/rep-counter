import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { PageHeader } from 'antd';

import ExerciseContext from '../../stores';
import Page from './Page';

export default withRouter(({ history }) => {
  const { exerciseStore } = useContext(ExerciseContext);

  return (
    <Page>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title={exerciseStore.currentExercise}
      />
    </Page>
  );
});
