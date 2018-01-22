import React from 'react';
import styled from 'styled-components';

class RatingInput extends React.Component {
  render() {
    const { value, handleOnChange, checked, name, id } = this.props;
    return (
      <Input
        type="radio"
        id={`input:${value}:${id}`}
        name={name}
        value={value}
        onChange={() => handleOnChange(value)}
        checked={checked}
      />
    );
  }
}

const Input = styled.input`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 40px;
  width: 40px;
  padding: 0;
  border: 0;
`;

export default RatingInput;
