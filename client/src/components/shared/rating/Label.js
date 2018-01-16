import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../constants';
import { StarIcon, ClearIcon } from '../icons';
import { rgba } from 'polished';
import { bounceIn, starburst } from '../animations';

class RatingLabel extends React.Component {
  render() {
    const { text, value, active, isSelected, id } = this.props;
    return (
      <Label htmlFor={`input:${value}:${id}`} title={`${value} stars`}>
        <Text>
          {text}
        </Text>

        {value > 0
          ? <StarIcon
              height={iconSize}
              width={iconSize}
              active={active}
              component={Icon}
              isSelected={isSelected}
              value={value}
            />
          : <ClearIcon height={iconSize} width={iconSize} component={Icon} />}
      </Label>
    );
  }
}

const iconSize = '40px';

const Label = styled.label`
  display: inline-block;
  width: 40px;
  height: 40px;
  z-index: 1;

  // Hide clear all button
  &:first-of-type svg {
    opacity: 0;
  }

  &:hover {
    > span {
      visibility: visible;
      opacity: 1;
    }

    // make all stars after the
    // hovered one inactive
    & ~ label svg {
      filter: none;
      path {
        fill: ${colors.gray};
      }
    }
  }
`;

const Text = styled.span`
  display: block;
  position: absolute;
  font-weight: 600;
  color: ${colors.black};
  height: ${iconSize};
  line-height: ${iconSize};
  bottom: -${iconSize};
  left: ${iconSize};
  right: 0;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
  text-align: center;
  pointer-events: none;
`;

const Icon = styled.svg`
	cursor: pointer;
	width: ${iconSize};
	height: ${iconSize};
	line-height: ${iconSize};
	text-align: center;
	transition: all 0.2s ease;
	filter: ${props =>
    props.active && `drop-shadow(0 4px 6px ${rgba(colors.blue, 0.3)});`}

	animation: ${props => props.isSelected && `1s ${bounceIn};`}

	&:active {
		transform: scale(0.9);
	}

	path {
		transition: fill 0.2s ease-out;
	}	
`;

export default RatingLabel;
