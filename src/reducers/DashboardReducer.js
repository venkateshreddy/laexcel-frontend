import { DashboardType } from '../actions/ActionType';

const initialState = {
  globalSearchStr: '',
  positions: [
    {
      id: 1,
      name: 'UX/UI Designer',
      skills: ['Photoshop', 'Illustrator', 'Corel Draw', 'HTML', 'CSS'],
      rate: 35,
      earned: 100,
      jobSuccess: 100,
      location: 'Danver',
      candidates: [
        {
          name: 'Venkatesh K',
          designation: 'Senior Web Expert',
          location: 'India',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'Venky',
          designation: 'Web Developer',
          location: 'Switzerland',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'K V Reddy',
          designation: 'UI Developer',
          location: 'Canada',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'Venkat',
          designation: 'UI UX Designer',
          location: 'Danver',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        }
      ]
    },
    {
      id: 2,
      name: 'Mobile Game Developer',
      skills: ['Android', 'IOS', 'Ionic', 'Mobile Gaming', 'Phone Gap'],
      rate: 45,
      earned: 200,
      jobSuccess: 90,
      location: 'Chicago',
      candidates: [
        {
          name: 'Venkatesh K',
          designation: 'Mobile Expert',
          location: 'India',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'Venky',
          designation: 'Mobile Game Developer',
          location: 'Switzerland',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'K V Reddy',
          designation: 'Android Developer',
          location: 'Canada',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'Venkat',
          designation: 'IOS Designer',
          location: 'Danver',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        }
      ]
    },
    {
      id: 3,
      name: 'Fullstack Developer',
      skills: ['NodeJS', 'Angular', 'ReactJS', 'HTML', 'CSS', 'MongoDB'],
      rate: 75,
      earned: 90,
      jobSuccess: 90,
      location: 'Los Angelles',
      candidates: [
        {
          name: 'Venkatesh K',
          designation: 'Full Stack Expert',
          location: 'India',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'Venky',
          designation: 'MEAN Stack Developer',
          location: 'Switzerland',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'K V Reddy',
          designation: 'MERN Stack Developer',
          location: 'Canada',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'Venkat',
          designation: 'UI & Backend Developer',
          location: 'Danver',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        }
      ]
    },
    {
      id: 4,
      name: 'UI Developer',
      skills: ['HTML5', 'CSS3', 'Javascript', 'JQuery', 'Bootstrap'],
      rate: 30,
      earned: 150,
      jobSuccess: 80,
      location: 'Dallas',
      candidates: [
        {
          name: 'Venkatesh K',
          designation: 'Senior Web Expert',
          location: 'India',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'Venky',
          designation: 'Web Developer',
          location: 'Switzerland',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'K V Reddy',
          designation: 'UI Developer',
          location: 'Canada',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'Venkat',
          designation: 'UI UX Designer',
          location: 'Danver',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        }
      ]
    },
    {
      id: 5,
      name: 'SAP Hana',
      skills: [
        'SAP',
        'ABAP',
        'Java',
        'Requirments Analysis',
        'Client Interaction'
      ],
      rate: 75,
      earned: 150,
      jobSuccess: 100,
      location: 'New York',
      candidates: [
        {
          name: 'Venkatesh K',
          designation: 'SAP Expert',
          location: 'India',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'Venky',
          designation: 'SAP Consultant',
          location: 'Switzerland',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'K V Reddy',
          designation: 'SAP Associate',
          location: 'Canada',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'Venkat',
          designation: 'SAP Consultant',
          location: 'Danver',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        }
      ]
    },
    {
      id: 6,
      name: 'PHP Developer',
      skills: ['PHP', 'Code Igniter', 'MySql', 'HTML', 'CSS', 'NoSql'],
      rate: 40,
      earned: 100,
      jobSuccess: 100,
      location: 'Los Vegas',
      candidates: [
        {
          name: 'Venkatesh K',
          designation: 'PHP Developer',
          location: 'India',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'Venky',
          designation: 'PHP Web Developer',
          location: 'Switzerland',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'K V Reddy',
          designation: 'Web Developer PHP',
          location: 'Canada',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        },
        {
          name: 'Venkat',
          designation: 'PHP Associate Developer',
          location: 'Danver',
          rate: 69,
          jobSuccess: 100,
          earned: 100
        }
      ]
    }
  ],
  // searchResult: {},
  globalSearchText: '',
  // toggleGridView: false
  currentView: 'tileView',
  snackBarOpen: false,
  snackBarMsg: ''
};

export default function reducer(state = initialState, action) {
  let st = { ...state };
  switch (action.type) {
    case 'SET_GLOBAL_SEARCH': {
      st = { ...state, globalSearchStr: action.string };
      break;
    }
    // case DashboardType.SEND_SEARCH_RESULT: {
    //   st = { ...state, searchResult: action.payload };
    //   break;
    // }
    case DashboardType.GLOBAL_SEARCH_TEXT: {
      st = { ...state, globalSearchText: action.payload };
      break;
    }
    case DashboardType.TOGGLE_GRID_VIEW: {
      // st = { ...state, toggleGridView: action.payload };
      st = { ...state, currentView: action.payload };
      break;
    }
    case DashboardType.HANDLE_SNACKBAR: {
      st = {
        ...state,
        snackBarOpen: action.payload.snackBarOpen,
        snackBarMsg: action.payload.snackBarMsg
      };
      break;
    }
    default: {
      return state;
    }
  }
  return st;
}
