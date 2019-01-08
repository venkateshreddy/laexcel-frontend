import { cloneDeep } from 'lodash';
import { Admission } from '../actions/ActionType';

const initialAddressForm = {
  inHostel: '',
  hostel: '',
  contactNumber: '',
  Presentline1: '',
  Presentline2: '',
  Presentline3: '',
  Presentstate: '',
  Presentcity: '',
  Presentpincode: '',
  PermanentLine1: '',
  Permanentline2: '',
  Permanentline3: '',
  Permanentstate: '',
  Permanentcity: '',
  Permanentpincode: ''
};
const initialEduForm = {
  examinationPassed: '',
  marksPercent: '',
  passingYear: '',
  schoolCollege: '',
  place: '',
  board: ''
};

const initialState = {
  admission: {
    admissionInformation: {},
    generalInformation: {},
    addressInformation: {
      form: initialAddressForm,
      errors: initialAddressForm
    },
    educationalInformation: {
      form: initialEduForm,
      errors: initialEduForm
    },
    otherInformation: {},
    programInformation: {}
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Admission.CREATE_ADMISSION: {
      return { ...state, admission: action.payload };
    }
    case Admission.SETSTATE_ADDRESS_INFORMATION: {
      const { admission } = state;
      const admissionClone = cloneDeep(admission);
      const obj = {};
      obj.form = action.form;
      obj.errors = action.errors;
      admissionClone.addressInformation = obj;
      return { ...state, admission: admissionClone };
    }
    case Admission.SETSTATE_ADDRESS_INFORMATION_ERRORS: {
      const { admission } = state;
      const admissionClone = cloneDeep(admission);
      const obj = {};
      obj.form = admissionClone.addressInformation.form;
      obj.errors = action.errors;
      admissionClone.addressInformation = obj;
      return { ...state, admission: admissionClone };
    }
    case Admission.SETSTATE_EDUCATION_INFORMATION: {
      const { admission } = state;
      const admissionClone = cloneDeep(admission);
      const obj = {};
      obj.form = action.form;
      obj.errors = action.errors;
      admissionClone.educationalInformation = obj;
      return { ...state, admission: admissionClone };
    }

    default:
      return state;
  }
}
