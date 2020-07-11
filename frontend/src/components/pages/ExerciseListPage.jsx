import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';

import {
  List, Typography, Collapse, PageHeader,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';


import ExerciseContext from '../../stores';
import Page from './Page';

import useNetworkResource from '../../networking/useNetworkResource';
import listAllExercises from '../../networking/exercises/listAllExercises';

import AddButton from '../ui/AddButton';
import NetworkingButton from '../ui/NetworkingButton';


const { Panel } = Collapse;

const Header = styled(PageHeader)`
  &>div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const CollapsibleList = styled(Collapse)`
  border: none;
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

const AddExerciseButton = styled(AddButton)`
  position: fixed;
  bottom: 32px;
  right: 32px;
`;

const ExerciseList = styled(List)`
  border: none;
`;

export default withRouter(observer(({ history }) => {
  const { loading, error, resource: exercises } = useNetworkResource(listAllExercises);
  const [exercisesByCategory, setExercisesByCategory] = useState([]);

  const { exerciseStore, authStore } = useContext(ExerciseContext);

  useEffect(() => {
    if (!exercises) return;

    setExercisesByCategory(exercises.reduce((accum, curr) => {
      const category = (curr.categories && curr.categories.length > 0) ? curr.categories[0] : 'Other';
      if (accum[category]) return { ...accum, [category]: [...accum[category], curr] };
      return { ...accum, [category]: [curr] };
    }, {}));
  }, [exercises]);

  return (
    <Page>
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
      {/* // TODO: Better error handling */}
      {error && error.message && <div>{JSON.stringify(error.message)}</div>}

      <CollapsibleList defaultActiveKey={['0']}>
        {Object.keys(exercisesByCategory).map((key, index) => (
          <Panel header={key} key={`${index}`}>
            <ExerciseList
              itemLayout="horizontal"
              dataSource={exercisesByCategory[key] || []}
              bordered
              split
              loading={loading}
              renderItem={exercise => (
                <List.Item
                  actions={[
                    <Link
                      to={`/exercise/edit/${exercise.id}`}
                      onClick={() => { exerciseStore.exerciseToEdit = exercise; }}
                    >
                      <EditOutlined />
                    </Link>,
                  ]}
                >
                  <Link
                    to={`/exercise/${exercise.id}`}
                    onClick={() => { exerciseStore.currentExercise = exercise; }}
                  >
                    <List.Item.Meta
                      title={exercise.name}
                      description={exercise.description}
                    />
                  </Link>
                </List.Item>
              )}
            />
          </Panel>
        ))}
      </CollapsibleList>

      <AddExerciseButton onClick={() => history.push('/exercise/new')} />
    </Page>
  );
}));
