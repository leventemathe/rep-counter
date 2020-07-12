import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';

import {
  List, Typography, Collapse, PageHeader,
} from 'antd';
import { EditOutlined, BarChartOutlined } from '@ant-design/icons';


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

  const sortExercisesByCategory = flatExercises => {
    const otherCategoryName = 'Other';

    // Get the exercises into object by array
    const exercisesByCategoryObj = flatExercises.reduce((accum, curr) => {
      const category = (curr.categories && curr.categories.length > 0) ? curr.categories[0] : otherCategoryName;
      if (accum[category]) return { ...accum, [category]: [...accum[category], curr] };
      return { ...accum, [category]: [curr] };
    }, {});

    // Move the object into an array, so we can sort by category name
    const exercisesByCategoryArr = Object.keys(exercisesByCategoryObj)
      .filter(key => key !== otherCategoryName)
      .map(key => ({
        category: key,
        exercise: exercisesByCategoryObj[key],
      }));

    // Sort the array by category, and insert "other" into the last place
    exercisesByCategoryArr.sort((a, b) => (a.category > b.category ? 1 : -1));
    if (exercisesByCategoryObj[otherCategoryName]) {
      exercisesByCategoryArr.push({
        category: otherCategoryName,
        exercise: exercisesByCategoryObj[otherCategoryName],
      });
    }

    return exercisesByCategoryArr;
  };

  useEffect(() => {
    if (!exercises) return;
    setExercisesByCategory(sortExercisesByCategory(exercises));
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
        {exercisesByCategory.map((exerciseByCategory, index) => (
          <Panel header={exerciseByCategory.category} key={`${index}`}>
            <ExerciseList
              itemLayout="horizontal"
              dataSource={exerciseByCategory.exercise || []}
              bordered
              split
              loading={loading}
              renderItem={exercise => (
                <List.Item
                  actions={[
                    <Link
                      to={`/exercise/sessions/${exercise.id}`}
                      onClick={() => { exerciseStore.currentExercise = exercise; }}
                    >
                      <BarChartOutlined />
                    </Link>,
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
