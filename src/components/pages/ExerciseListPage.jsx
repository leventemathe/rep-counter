import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Button, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
    name: 'squat',
  },
  {
    id: 1,
    name: 'benchpress',
  },
  {
    id: 2,
    name: 'row',
  },
];

export default () => (
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
            title={<Link to={`/${item.id}`}>{item.name}</Link>}
            // description=""
          />
        </List.Item>
      )}
    />

    <AddButton type="primary" shape="circle" size="large">
      <PlusOutlined />
    </AddButton>
  </Page>
);
