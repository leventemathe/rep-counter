import React from 'react';
import styled, { css } from 'styled-components';

import { Button } from 'antd';

const Styles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  
  width: 100%;

  padding: 16px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.25);

  @keyframes showAnimation {
    from {
      background-color: #1890ff;
    }
    to {
      background-color: white;
    }
  }

  ${props => props.playAnimation && css`animation: showAnimation 0.6s ease-out`}
`;

export default ({ playAnimation }) => (
  <Styles playAnimation={playAnimation}>
    <Button>-10</Button>
    <Button>-5</Button>
    <Button>-1</Button>
    <div>123</div>
    <Button>+1</Button>
    <Button>+5</Button>
    <Button>+10</Button>
  </Styles>
);
