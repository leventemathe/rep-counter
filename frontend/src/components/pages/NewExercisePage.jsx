import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import {
  PageHeader, Form, Input, Button,
} from 'antd';

// import ExerciseContext from '../../stores';
import createNewExercise from '../../networking/exercises/createNewExercise';

import Page from './Page';
// import convertUnit from '../../helpers/convertUnit';


const NewExerciseForm = styled(Form)`
  margin: 16px;
  
  button {
    display: block;
    margin: 0 auto;
  }
`;

export default withRouter(observer(({ history }) => {
  // const { exerciseStore } = useContext(ExerciseContext);

  // const getDefaultWeight = (weight) => {
  //   if (!weight) return null;
  //   return convertUnit(weight, exerciseStore.unit);
  // };

  const [loading, setLoading] = useState(false);

  const onFinish = async (exercise) => {
    try {
      setLoading(true);
      await createNewExercise(exercise);
      history.goBack();
    } catch (error) {
      // TODO: better error handling
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (error) => {
    console.error('Creating new exercise failed: ', error);
    // TODO: handle error with modal or something
  };

  return (
    <Page>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="New Exercise"
      />

      <NewExerciseForm
        name="newExercise"
        hideRequiredMark
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input a name!' }]}
        >
          <Input placeholder="e.g. Benchpress (required)" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input placeholder="optional" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
          >
            {loading ? 'Loading' : 'Submit' }
          </Button>
        </Form.Item>
      </NewExerciseForm>
    </Page>
  );
}));
