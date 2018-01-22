import React from 'react';
import styled from 'styled-components';
import { colors } from './constants';
import { lighten } from 'polished';

export default styled.button`
  outline: none;
  border: none;
  min-width: 130px;
  padding: 10px 20px;
  border-radius: 18px;
  background: ${colors.blue};
  color: ${colors.white};
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.15);
  transition: background 0.15s ease;

  &:hover {
    background: ${lighten(0.1, colors.blue)};
  }
`;
