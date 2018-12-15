import { Employee } from '../actions/ActionType';

const initialState = {
  employees: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Employee.FETCH_EMPLOYEE:
      return { ...state, employees: action.payload };
    default:
      return state;
  }
}
