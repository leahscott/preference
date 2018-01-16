import React from 'react';
import { colors } from './constants';
import styled from 'styled-components';

export const StarIcon = ({
  component: Component,
  active,
  value,
  ...otherProps
}) => {
  return (
    <Component
      {...otherProps}
      active={active}
      xmlns="http://www.w3.org/2000/svg"
      className="icon"
    >
      <path
        d="M20 25.943l-8.067 5.889a.5.5 0 0 1-.77-.56l3.107-9.492-8.093-5.853a.5.5 0 0 1 .294-.905l9.988.022 3.065-9.506a.5.5 0 0 1 .952 0l3.066 9.506 9.987-.022a.5.5 0 0 1 .294.905L25.73 21.78l3.107 9.492a.5.5 0 0 1-.77.56L20 25.943z"
        fill={active ? colors.blue : colors.gray}
        fillRule="evenodd"
      />
    </Component>
  );
};

export const ClearIcon = ({ component: Component, width, height }) => {
  return (
    <Component width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 32c-6.627 0-12-5.373-12-12S13.373 8 20 8s12 5.373 12 12-5.373 12-12 12zm0-3a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm6-10.5v3H14v-3h12z"
        fill={colors.gray}
        fillRule="nonzero"
      />
    </Component>
  );
};
