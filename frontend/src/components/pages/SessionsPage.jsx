import React, { useContext } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'antd';

import ExerciseContext from '../../stores';
import useNetworkResource from '../../networking/useNetworkResource';
import getSessions from '../../networking/exercises/getSessions';

const Styles = styled.div``;

export default withRouter(({ history }) => {
  const { exerciseStore } = useContext(ExerciseContext);
  const { currentExercise } = exerciseStore;

  // TODO: error handling
  const { loading, error, resource: exercise } = useNetworkResource(() => getSessions(currentExercise.id));

  // sessions = [
  //   {
  //     timestamp,
  //     sets: [
  //       {
  //         weight,
  //         reps,
  //       }
  //     ]
  //   }
  // ]
  const sessions = exercise ? exercise.exercise.sessions : [];

  const goBack = () => {
    exerciseStore.exerciseToEdit = null;
    history.goBack();
  };

  if (!currentExercise) {
    history.push('/');
    return null;
  }

  return (

    <Styles>
      <PageHeader
        className="site-page-header"
        onBack={goBack}
        title={`Sessions for ${(currentExercise.name) || 'Sessions for exercise'}`}
      />
      {loading && !error
        ? 'Loading'
        : (
          <>
            <div>{JSON.stringify(sessions)}</div>
          </>
        )}
    </Styles>
  );
});
