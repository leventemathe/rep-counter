import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import {
  PageHeader, Form, Input, Button,
} from 'antd';

import ExerciseContext from '../../stores';

import Page from './Page';

const NewExerciseForm = styled(Form)`
  margin: 16px;
  
  button {
    display: block;
    margin: 0 auto;
  }
`;

export default withRouter(observer(({ history }) => {
  const { exerciseStore } = useContext(ExerciseContext);

  const onFinish = () => {
    // TODO: call serverless function to store in db
  };

  const onFinishFailed = () => {
    console.error('Creating new exercise failed');
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

        <Form.Item
          label="Starting weight"
          name="weight"
        >
          <Input placeholder={`optional (${exerciseStore.unit})`} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </NewExerciseForm>
    </Page>
  );
}));
