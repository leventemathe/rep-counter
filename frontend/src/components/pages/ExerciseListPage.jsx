import React, { useContext } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';

import { List, Typography } from 'antd';

import ExerciseContext from '../../stores';
import Page from './Page';

import useNetworkResource from '../../networking/useNetworkResource';
import listAllExercises from '../../networking/exercises/listAllExercises';

import AddButton from '../ui/AddButton';
import NetworkingButton from '../ui/NetworkingButton';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddExerciseButton = styled(AddButton)`
  position: absolute;
  bottom: 32px;
  right: 32px;
`;

const ExerciseList = styled(List)`
  border: none;
`;

export default withRouter(observer(({ history }) => {
  const { loading, error, resource: exercises } = useNetworkResource(listAllExercises);
  const { exerciseStore, authStore } = useContext(ExerciseContext);

  return (
    <Page>
      {/* // TODO: Better error handling */}
      {error && error.message && <div>{JSON.stringify(error.message)}</div>}
      <ExerciseList
        itemLayout="horizontal"
        header={(
          <Header>
            <Typography.Title level={3}>Exercises</Typography.Title>
            <NetworkingButton
              buttonProps={{
              }}
              text="Logout"
              loadingText="Logging out..."
              action={async () => authStore.logout()}
              onNetworkError={(e) => console.log('Error while logging out: ', e)}
            />
          </Header>
        )}
        dataSource={exercises || []}
        bordered
        loading={loading}
        renderItem={exercise => (
          <Link
            to={`/exercise/${exercise.name}`}
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

      <AddExerciseButton onClick={() => history.push('/exercise/new')} />
    </Page>
  );
}));
