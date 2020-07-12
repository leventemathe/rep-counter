import React from 'react';
import styled from 'styled-components';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

const Styles = styled.div`
  margin: 0 16px;
  margin-top: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;  
`;

const ControlArea = styled.div`
  display: flex;
  align-items: center;

  &>*:not(:last-child) {
    margin-right: 8px;    
  }

  h4 {
    margin-bottom: 0;
  }
`;

export default ({
  adjustSet, set, setIndex, value,
}) => (
  <Styles>
    <Typography.Text code>Help</Typography.Text>
    <ControlArea>
      <Button onClick={() => adjustSet(setIndex, -1, value)}>
        <MinusOutlined />
      </Button>
      <Typography.Title level={4}>{set[value]}</Typography.Title>
      <Button onClick={() => adjustSet(setIndex, +1, value)}>
        <PlusOutlined />
      </Button>
    </ControlArea>
  </Styles>
);
