import React from 'react';
import Card from './Card';
import * as Rating from './rating/';
import styled from 'styled-components';
import { colors } from './constants';
import { clearFix, rgba } from 'polished';
import { shake, starburst } from './animations';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 0 };
  }

  static ratings = [
    'Abysmal / No Opinion',
    'Awful',
    'Bad',
    'Fair',
    'Good',
    'Excellent'
  ];

  setSelected = selected => {
    this.setState({ selected });
  };

  renderLabels = () => {
    const { selected } = this.state;
    const { ratingId } = this.props;
    let counter = selected;

    return Question.ratings.map((rating, index) => {
      let active = false;

      if (counter >= 0) {
        active = true;
        counter--;
      }

      return (
        <Rating.Label
          text={rating}
          value={index}
          id={ratingId}
          key={index}
          active={active}
          isSelected={index === selected}
        />
      );
    });
  };

  renderInputs = () => {
    const { selected } = this.state;
    const { ratingId, question } = this.props;
    return Question.ratings.map((rating, index) =>
      <Rating.Input
        value={index}
        handleOnChange={this.setSelected}
        checked={index === selected}
        key={index}
        id={ratingId}
        name={question}
      />
    );
  };

  render() {
    const { question } = this.props;
    const { selected } = this.state;

    return (
      <Card>
        <RatingWrapper selected={selected}>
          <Query>
            {question}
          </Query>
          {this.renderInputs()}
          {this.renderLabels()}
          <Starburst />
        </RatingWrapper>
      </Card>
    );
  }
}

const Query = styled.legend`
  font-size: 24px;
  color: black;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 32px;
  padding-left: 40px;
`;

const RatingWrapper = styled.fieldset`
  position: relative;
  display: inline-block;
  user-select: none;
  margin-left: -40px;
  ${clearFix()};

  input[id^="input:0"]:checked:focus ~ label svg {
    animation: 0.4s ${shake};
  }

  input[id^="input:5"]:checked ~ span {
    animation: 1s ${starburst};
  }

  // Make all stars active. We will selectivly
  // disable stars after the hovered star.
  &:hover {
    svg {
      filter: drop-shadow(0 4px 6px ${rgba(colors.blue, 0.3)});
      path {
        fill: ${colors.blue};
      }
    }

    label:first-of-type {
      svg {
        opacity: 1;
        filter: none;
        path {
          fill: ${colors.gray};
        }
      }

      &:hover {
        & ~ label:nth-of-type(-n + ${props => props.selected + 1}) svg path {
          fill: ${colors.blueLight};
        }
        path {
          fill: ${colors.red};
        }
      }
    }
  }
`;

const Starburst = styled.span`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-sizing: border-box;
  position: absolute;
  bottom: 2px;
  right: 35px;
  z-index: -1;
  opacity: 0;
`;

export default Question;
