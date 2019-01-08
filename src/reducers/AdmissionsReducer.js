import { Admission } from '../actions/ActionType';

const initialState = {
  admission: {
    admissionInformation: {},
    generalInformation: {},
    addressInformation: {},
    educationalInformation: {},
    otherInformation: {},
    programInformation: {}
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Admission.CREATE_ADMISSION: {
      return { ...state, admission: action.payload };
    }

    default:
      return state;
  }
}
