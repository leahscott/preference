import React from 'react';
import { keyframes } from 'styled-components';
import { colors } from './constants';

export const bounceIn = keyframes`
	from,
	  20%,
	  40%,
	  60%,
	  80%,
	  to {
	    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
	  }

	  0% {
	    opacity: 0;
	    transform: scale3d(0, 0, 0);
	  }

	  20% {
	    transform: scale3d(1.1, 1.1, 1.1);
	  }

	  40% {
	    transform: scale3d(0.9, 0.9, 0.9);
	  }

	  60% {
	    opacity: 1;
	    transform: scale3d(1.03, 1.03, 1.03);
	  }

	  80% {
	    transform: scale3d(0.97, 0.97, 0.97);
	  }

	  to {
	    opacity: 1;
	    transform: scale3d(1, 1, 1);
	  }
`;

export const shake = keyframes`
 from {
    transform: translateX(0);
  }

  5% {
    transform: translateX(5%);
  }

  25% {
    transform: translateX(-20%);
  }

  50% {
    transform: translateX(20%);
  }

  75% {
    transform: translateX(-20%);
  }

  95% {
    transform: translateX(5%);
  }

  to {
    transform: translateX(0);
  }
`;

export const starburst = keyframes`
	from {
    opacity: 1;
    z-index: 1;
    transform: scale(0);
    box-shadow: inset 0 0 0 30px ${colors.blueLight};
  }
  10% {
    box-shadow: inset 0 0 0 30px ${colors.blueLight};
  }
  40% {
    box-shadow: inset 0 0 0 3px ${colors.blueLight};
    transform: scale(1.2);
    opacity: 0.8;
  }
  to {
    box-shadow: inset 0 0 0 3px ${colors.blueLight};
    transform: scale(1.2);
    opacity: 0;
    z-indez: 0;
  }
}
`;
