import React, { useContext } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { PageHeader, Empty } from 'antd';

import Page from './Page';
import ExerciseContext from '../../stores';
import useNetworkResource from '../../networking/useNetworkResource';
import getSessions from '../../networking/exercises/getSessions';
import Spinner from '../ui/Spinner';
import MagicScore from '../charts/MagicScore';

const SessionsPage = styled(Page)`  
  .recharts-cartesian-grid-vertical>line:last-child {
    stroke-opacity: 0;
  }
`;

export default withRouter(({ history }) => {
  const { exerciseStore } = useContext(ExerciseContext);
  const { currentExercise } = exerciseStore;

  const { loading, error, resource: exercise } = useNetworkResource(() => getSessions(currentExercise.id));

  // sessions = [
  //   {
  //     timestamp,
  //     sets: [
  //       {
  //         weight,
  //         reps,
  //         help,
  //       }
  //     ]
  //   }
  // ]
  const sessions = exercise ? exercise.exercise.sessions : [];

  const goBack = () => {
    exerciseStore.currentExercise = null;
    history.goBack();
  };

  if (!currentExercise) {
    history.push('/');
    return null;
  }

  const isExerciseEmpty = !exercise?.exercise?.sessions || exercise?.exercise?.sessions.length < 1;

  return (
    <SessionsPage>
      <PageHeader
        className="site-page-header"
        onBack={goBack}
        title={`Sessions for ${(currentExercise.name) || 'Sessions for exercise'}`}
      />
      {loading && !error && <Spinner />}
      {!loading && !error && !isExerciseEmpty && (
        <MagicScore sessions={sessions} />
      )}
      {!loading && isExerciseEmpty && <Empty />}
    </SessionsPage>
  );
});
