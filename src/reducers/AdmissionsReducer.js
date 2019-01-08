import { Admission } from '../actions/ActionType';

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
    addressInformation: {},
    educationalInformation: {},
    otherInformation: {},
    programInformation: {}
  },
  admissions: []
};

const setAdmissionInformation = (state, action) => {
  const admission = { ...state.admission };
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
  const admission = { ...state.admission };
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
  const admission = { ...state.admission };
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

    default:
      return state;
  }
}
