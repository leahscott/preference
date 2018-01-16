import styled from 'styled-components';
import { colors, utilityColors } from './constants';

export default styled.div`
  background: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 12px 24px -8px ${utilityColors.shadowBlack};
  display: block;
  width: 350px;
  padding: 40px 40px;
  text-align: center;

  & + & {
    margin-top: 30px;
  }
`;
