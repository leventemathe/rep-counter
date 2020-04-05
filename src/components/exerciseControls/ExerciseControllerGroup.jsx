import React from 'react';
import styled from 'styled-components';

import { Typography } from 'antd';

import ExerciseController from './ExerciseController';

const ExerciseControllerTitle = styled(Typography.Title)`
  padding: 0 !important;
  margin: 0.3rem 0.6rem !important;
  color: white !important;
`;

const TitleArea = styled.div`
  background-color: #1890ff;
  width: 100%;
`;

export default ({ index, sets, unit }) => (
  <div>
    <TitleArea>
      <ExerciseControllerTitle level={3}>{`Set ${sets.length - index}`}</ExerciseControllerTitle>
    </TitleArea>

    <ExerciseController
      title="Reps"
      playAnimation={sets.length > 1 && index === 0}
    />
    <ExerciseController
      title={`Weight (${unit})`}
      playAnimation={sets.length > 1 && index === 0}
      border
    />
  </div>
);
