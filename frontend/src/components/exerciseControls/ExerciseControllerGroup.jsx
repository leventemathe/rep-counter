import React from 'react';
import styled, { css } from 'styled-components';

import { Typography, Button } from 'antd';

import ExerciseController from './ExerciseController';
import HelpController from './HelpController';

const Styles = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExerciseControllerTitle = styled(Typography.Title)`
  padding: 0 !important;
  margin: 0.3rem 0.6rem !important;
  color: white !important;
`;

const TitleArea = styled.div`
  background-color: #1890ff;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @keyframes showTitleAnimation {
    from {
      transform: scale(0) translateY(-8rem);
    }
    to {
      transform: scale(1) translateY(0);
    }    
  }

  ${props => props.playAnimation && css`animation: showTitleAnimation 0.3s ease-out`}
`;

const RemoveButton = styled(Button)`
  margin: 0.6rem;
`;

/** Use this only in the ExerciseControllerGroup for now, beceause animation is optimized for that */
export default ({
  index, sets, unit, adjustSet, onRemove, shouldAnimate,
}) => {
  const notFirstGroup = (sets.length > 1 && index === 0) && shouldAnimate;

  return (
    <Styles>
      <TitleArea playAnimation={notFirstGroup}>
        <ExerciseControllerTitle level={3}>{`Set ${sets.length - index}`}</ExerciseControllerTitle>
        <RemoveButton type="text" onClick={() => onRemove(index)}>Remove</RemoveButton>
      </TitleArea>

      <ExerciseController
        title="Reps"
        playAnimation={notFirstGroup}
        set={sets[index]}
        setIndex={index}
        value="reps"
        adjustSet={adjustSet}
      />
      <ExerciseController
        title={`Weight (${unit})`}
        playAnimation={notFirstGroup}
        set={sets[index]}
        setIndex={index}
        value="weight"
        adjustSet={adjustSet}
      />
      <HelpController
        adjustSet={adjustSet}
        set={sets[index]}
        setIndex={index}
        value="help"
      />
    </Styles>
  );
};
