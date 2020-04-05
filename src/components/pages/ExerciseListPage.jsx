import React, { useContext } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';

import { Button, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import ExerciseContext from '../../stores';
import Page from './Page';

import useNetworkResource from '../../networking/useNetworkResource';
import listAllExercises from '../../networking/exercises/listAllExercises';

const AddButton = styled(Button)`
  position: absolute;
  bottom: 32px;
  right: 32px;
`;

const ExerciseList = styled(List)`
  border: none;
`;


export default withRouter(observer(({ history }) => {
  const { loading, error, resource: exercises } = useNetworkResource(listAllExercises);
  const { exerciseStore } = useContext(ExerciseContext);

  return (
    <Page>
      {/* // TODO: Better error handling */}
      {error && <div>{error}</div>}
      <ExerciseList
        itemLayout="horizontal"
        header={<Typography.Title level={3}>Exercises</Typography.Title>}
        dataSource={exercises || []}
        bordered
        loading={loading}
        renderItem={exercise => (
          <Link
            to={`/exercise/${exercise.id}`}
            onClick={() => { exerciseStore.currentExercise = exercise; }}
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
