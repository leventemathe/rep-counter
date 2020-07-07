import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import {
  PageHeader,
} from 'antd';

import Page from './Page';
import ExerciseForm from '../forms/ExerciseForm';

import createNewExercise from '../../networking/exercises/createNewExercise';

export default withRouter(observer(({ history }) => (
  <Page>
    <PageHeader
      className="site-page-header"
      onBack={() => history.goBack()}
      title="New Exercise"
    />
    <ExerciseForm
      action={async exercise => {
        await createNewExercise(exercise);
        history.goBack();
      }}
    />
  </Page>
)));
