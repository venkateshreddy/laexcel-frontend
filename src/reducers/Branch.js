import { Branch } from '../actions/ActionType';

const initialState = {
  branches: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Branch.CREATE_BRANCH: {
      const branches = [...state.branches];
      branches.unshift(action.payload);
      return { ...state, branches };
    }
    case Branch.FETCH_BRANCHES: {
      return { ...state, branches: action.payload };
    }
    default:
      return state;
  }
}
