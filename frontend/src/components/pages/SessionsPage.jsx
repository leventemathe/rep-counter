import React, { useContext } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { PageHeader, Typography } from 'antd';
import {
  AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip, ResponsiveContainer,
} from 'recharts';

import Page from './Page';
import ExerciseContext from '../../stores';
import useNetworkResource from '../../networking/useNetworkResource';
import getSessions from '../../networking/exercises/getSessions';
import Spinner from '../ui/Spinner';

const SessionsPage = styled(Page)`  
  .recharts-cartesian-grid-vertical>line:last-child {
    stroke-opacity: 0;
  }
`;

const Title = styled(Typography.Title)`
  text-align: center;
  margin-top: 16px;
  margin-bottom: 12px;
  font-size: 1rem !important;
`;

const ChartArea = styled.div`  
  @media (orientation: landscape) {
    padding: 0 10%;
  }
`;

const ChartLabel = ({
  x, y, fill, value, fontFamily, index,
}) => (index === 0 ? null : (
  <text
    x={x}
    y={y}
    dy={-12}
    fontSize="12"
    fontFamily={fontFamily}
    fill={fill}
    textAnchor="middle"
  >
    {value}
  </text>
));

const XTick = ({
  x, y, fill, fontFamily, payload,
}) => (
  <text
    x={x}
    y={y}
    dy={16}
    fontSize="10"
    fontFamily={fontFamily}
    fill={fill}
    textAnchor="middle"
  >
    {String(payload.value).substr(0, 4)}
  </text>
);

const YTick = ({
  x, y, fill, fontFamily, payload,
}) => (
  <text
    x={x}
    y={y}
    dy={0}
    dx={-16}
    fontSize="10"
    fontFamily={fontFamily}
    fill={fill}
    textAnchor="middle"
  >
    {String(payload.value)}
  </text>
);

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

  const magicScores = sessions.reduce((accum, session) => {
    sessions.sort((a, b) => a.timestamp - b.timestamp);
    const magicScore = session.sets.reduce((setAccum, set) => setAccum + (set.weight * set.reps) - ((set.weight / 2) * set.help), 0);
    return [...accum, { magicScore, date: session.timestamp }];
  }, []);

  const goBack = () => {
    exerciseStore.currentExercise = null;
    history.goBack();
  };

  if (!currentExercise) {
    history.push('/');
    return null;
  }

  return (
    <SessionsPage>
      <PageHeader
        className="site-page-header"
        onBack={goBack}
        title={`Sessions for ${(currentExercise.name) || 'Sessions for exercise'}`}
      />
      {loading && !error
        ? <Spinner />
        : (
          <ChartArea>
            <Title level={4}>Magic Score</Title>

            <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
              <AreaChart
                stackOffset="wiggle"
                data={magicScores}
                margin={{
                  top: 16, bottom: 0, left: -12, right: 8,
                }}
              >
                <defs>
                  <linearGradient id="magicScoreAreaColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="5 5"
                  horizontal={false}
                />
                <XAxis
                  dataKey="date"
                  padding={{ right: 32 }}
                  tick={<XTick />}
                  interval={0}
                />
                <YAxis
                  dataKey="magicScore"
                  domain={[dataMin => dataMin * 0.6, dataMax => dataMax * 1.2]}
                  tick={<YTick />}
                  interval="preserveStartEnd"
                />
                <Tooltip />
                <Area
                  animationDuration={600}
                  dot
                  stroke="none"
                  label={<ChartLabel />}
                  type="monotone"
                  dataKey="magicScore"
                  fillOpacity={0.5}
                  fill="url(#magicScoreAreaColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartArea>
        )}
    </SessionsPage>
  );
});
