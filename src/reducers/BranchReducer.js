import { findIndex } from 'lodash';
import { Branch } from '../actions/ActionType';

const initialState = {
  branches: []
};

const updateBranch = (state, action) => {
  const branches = [...state.branches];
  const index = findIndex(branches, { id: action.payload.id });
  if (index >= 0) {
    branches[index] = action.payload;
  }
  return { ...state, branches };
};

const deleteBranches = (state, action) => {
  const branches = state.branches.filter(
    branch => !action.payload.ids.includes(branch.id)
  );
  return { ...state, branches };
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

    case Branch.UPDATE_BRANCH: {
      return updateBranch(state, action);
    }

    case Branch.DELETE_BRANCHES: {
      return deleteBranches(state, action);
    }

    default:
      return state;
  }
}
