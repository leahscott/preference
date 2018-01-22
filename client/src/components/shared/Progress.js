import React from 'react';
import { Circle } from 'rc-progress';
import { colors } from './constants';
import { lighten } from 'polished';

const options = {
  strokeLinecap: 'butt',
  strokeWidth: 25,
  trailWidth: 25,
  strokeColor: colors.green,
  trailColor: lighten(0.45, colors.green),
  style: {
    width: 18,
    height: 18,
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: 8
  }
};

class Progress extends React.Component {
  render() {
    return <Circle {...options} {...this.props} />;
  }
}

export default Progress;
