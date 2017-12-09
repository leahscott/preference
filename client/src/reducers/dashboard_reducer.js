import { SET_DASHBOARD } from '../actions/types';

const INITIAL_STATE = {
  content: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DASHBOARD:
      return { ...state, content: action.payload };
  }

  return state;
}
