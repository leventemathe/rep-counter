import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

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
  },
  {
    id: 1,
    name: 'Benchpress',
  },
  {
    id: 2,
    name: 'Row',
  },
];

export default observer(() => {
  const exerciseStore = useContext(ExerciseContext);

  return (
    <Page>
      <ExerciseList
        itemLayout="horizontal"
        header={<Typography.Title level={3}>Exercises</Typography.Title>}
        dataSource={exercises}
        bordered
      // loading
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
            // avatar={<Avatar src="" />}
              onClick={() => { exerciseStore.currentExercise = item.name; }}
              title={<Link to={`/exercise/${item.id}`}>{item.name}</Link>}
            />
          </List.Item>
        )}
      />

      <AddButton type="primary" shape="circle" size="large">
        <PlusOutlined />
      </AddButton>
    </Page>
  );
});
