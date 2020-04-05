import React from 'react';
import styled, { css } from 'styled-components';

import { Button, Typography } from 'antd';

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 16px;

  ${props => props.border && css`border-bottom: 1px solid rgba(0, 0, 0, 0.25);`}

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

const ControllerStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  
  width: 100%;

  margin-top: 16px; 
`;

export default ({ playAnimation, border, title }) => (
  <Styles playAnimation={playAnimation} border={border}>
    <Typography.Text code>{title}</Typography.Text>

    <ControllerStyles>
      <Button>-10</Button>
      <Button>-5</Button>
      <Button>-1</Button>
      <div>123</div>
      <Button>+1</Button>
      <Button>+5</Button>
      <Button>+10</Button>
    </ControllerStyles>
  </Styles>
);
