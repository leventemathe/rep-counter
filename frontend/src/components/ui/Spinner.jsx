import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const Styles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => (
  <Styles>
    <Spin />
  </Styles>
);
