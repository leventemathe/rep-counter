import React from 'react';
import styled, { css } from 'styled-components';

import { Button, Typography } from 'antd';

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 16px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.25);

  overflow: hidden;

  @keyframes showControllerAnimation {
    0% {
      max-height: 0;
      padding: 0 16px;
      background-color: #1890ff;
    }
    40% {
      max-height: 0;
      padding: 0 16px;
      background-color: #1890ff;
    }
    100% {
      max-height: 15rem;
      padding: 16px;
      background-color: white;
    }
  }

  ${props => props.playAnimation && css`
    animation: showControllerAnimation 0.7s ease-out;
  `}
`;

const ControllerStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 16px; 
`;

const ControllerButton = styled(Button)`
  width: 4rem;
  height: 3rem;
  margin: 4px 0;
  border: none;
`;

const MinuButton = styled(ControllerButton)`
  background-color: #ff4d4f;
  
  &:hover {
    background-color: #ff4d4f;
  }
`;

const PlusButton = styled(ControllerButton)`
  background-color: #a0d911;
  
  &:hover {
    background-color: #a0d911;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const ValueArea = styled.div`
  display: grid;
  place-items: center;

  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 50%;

  width: 4rem;
  height: 4rem;

  * {
    padding: 0 !important;
    margin: 0 !important;
  }
`;

export default ({
  title, playAnimation, set, setIndex, value, adjustSet,
}) => (
  <Styles playAnimation={playAnimation}>
    <Typography.Text code>{title}</Typography.Text>

    <ControllerStyles>
      <ButtonArea>
        <MinuButton onClick={() => adjustSet(setIndex, -1, value)} type="primary">1</MinuButton>
        <MinuButton onClick={() => adjustSet(setIndex, -5, value)} type="primary">5</MinuButton>
        <MinuButton onClick={() => adjustSet(setIndex, -10, value)} type="primary">10</MinuButton>
      </ButtonArea>

      <Typography.Title level={3}>-</Typography.Title>

      <ValueArea>
        <Typography.Title level={4}>{set[value]}</Typography.Title>
      </ValueArea>

      <Typography.Title level={3}>+</Typography.Title>

      <ButtonArea>
        <PlusButton onClick={() => adjustSet(setIndex, 1, value)} type="primary">1</PlusButton>
        <PlusButton onClick={() => adjustSet(setIndex, 5, value)} type="primary">5</PlusButton>
        <PlusButton onClick={() => adjustSet(setIndex, 10, value)} type="primary">10</PlusButton>
      </ButtonArea>
    </ControllerStyles>
  </Styles>
);
