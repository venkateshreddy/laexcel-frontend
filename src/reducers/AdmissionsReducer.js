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
    admissionInformation: {
      thruCounselling: ''
    },
    generalInformation: {
      firstName: '',
      middleName: '',
      lastName: '',
      dob: '',
      contactNumber: '',
      email: '',
      fatherFirstName: '',
      fatherMiddleName: '',
      fatherLastName: '',
      fatherOccupation: '',
      fatherContactNumber: '',
      motherName: '',
      motherOccupation: '',
      siblingName: '',
      qualification: '',
      institute: '',
      category: ''
    },
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
  },
  admissions: []
};

const setAdmissionInformation = (state, action) => {
  const admission = cloneDeep(state.admission);
  const admissionInformation = { ...admission.admissionInformation };
  if (admissionInformation[action.payload.key]) {
    admissionInformation[action.payload.key] = action.payload.value;
  } else {
    admissionInformation[action.payload.key] = '';
    admissionInformation[action.payload.key] = action.payload.value;
  }
  admission.admissionInformation = admissionInformation;
  return { ...state, admission };
};

const setGeneralInformation = (state, action) => {
  const admission = cloneDeep(state.admission);
  const generalInformation = { ...admission.generalInformation };
  if (generalInformation[action.payload.key]) {
    generalInformation[action.payload.key] = action.payload.value;
  } else {
    generalInformation[action.payload.key] = '';
    generalInformation[action.payload.key] = action.payload.value;
  }
  admission.generalInformation = generalInformation;
  return { ...state, admission };
};

const prefilGeneralInfo = (state, action) => {
  const admission = cloneDeep(state.admission);
  const generalInformation = { ...admission.generalInformation };
  generalInformation.firstName = action.payload.firstName;
  generalInformation.email = action.payload.email;
  generalInformation.contactNumber = action.payload.contactNumber;
  admission.generalInformation = generalInformation;
  return { ...state, admission };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Admission.FETCH_ALL_ADMISSIONS: {
      return { ...state, admissions: action.payload };
    }

    case Admission.SET_ADMISSION_INFORMATION: {
      return setAdmissionInformation(state, action);
    }

    case Admission.PREFIL_GENERAL_INFORMATION: {
      return prefilGeneralInfo(state, action);
    }

    case Admission.SET_GENERAL_INFORMATION: {
      return setGeneralInformation(state, action);
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
