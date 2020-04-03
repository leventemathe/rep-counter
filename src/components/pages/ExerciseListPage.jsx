import React, { useContext } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';

import { Button, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import ExerciseContext from '../../stores';
import Page from './Page';

const AddButton = styled(Button)`
  position: absolute;
  bottom: 32px;
  right: 32px;
`;

const ExerciseList = styled(List)`
  border: none;
`;

const exercises = [
  {
    id: 0,
    name: 'Squat',
    description: 'You squat, then stand up...',
  },
  {
    id: 1,
    name: 'Benchpress',
    description: 'You press the bar above you, dummy!',
  },
  {
    id: 2,
    name: 'Row',
    description: 'Pull, like you never pulled before!',
  },
];

export default withRouter(observer(({ history }) => {
  const { exerciseStore } = useContext(ExerciseContext);

  return (
    <Page>
      <ExerciseList
        itemLayout="horizontal"
        header={<Typography.Title level={3}>Exercises</Typography.Title>}
        dataSource={exercises}
        bordered
        // loading
        renderItem={exercise => (
          <Link
            to={`/exercise/${exercise.id}`}
            onClick={() => { exerciseStore.currentExercise = exercise.name; }}
          >
            <List.Item>
              <List.Item.Meta
                title={exercise.name}
                description={exercise.description}
              />
            </List.Item>
          </Link>
        )}
      />

      <AddButton
        type="primary"
        shape="circle"
        size="large"
        onClick={() => history.push('/exercise/new')}
      >
        <PlusOutlined />
      </AddButton>
    </Page>
  );
}));
