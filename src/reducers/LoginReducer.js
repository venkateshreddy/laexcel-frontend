import { filter, intersection } from 'lodash';
import { LoginType, ErrorType } from '../actions/ActionType';
import { navbarOptions as MENULIST } from '../screens/NavBar/navBarOptions';
import { routesOptions } from '../screens/Routes/RoutesOptions';

const initialState = {
  userInfo: null,
  message: null,
  loggedInUser: { email: 'demoUser@gmail.com' },
  menu: [{ id: 0, routing: 'student', icon: '', name: 'Student' }],
  routesMenu: []
};

const setMenu = user => {
  let filtered = [];
  if (user) {
    filtered = filter(MENULIST, item => {
      const final = intersection(user.roles, item.role);
      if (final.length > 0) {
        return item;
      }
      return undefined;
    });
  }
  return filtered;
};

const setRouteOptions = user => {
  let filtered = [];
  if (user) {
    filtered = filter(routesOptions, item => {
      const final = intersection(user.roles, item.role);
      if (final.length > 0) {
        return item;
      }
      return undefined;
    });
  }
  return filtered;
};

// const getInitialState = () => {
//   const data = { ...initialState };
//   const loggedInUser = sessionStorage.getItem('userdata');
//   const parsedLoggedInUser = JSON.parse(loggedInUser);
//   if (loggedInUser !== null) {
//     data.loggedInUser = JSON.parse(loggedInUser);
//     data.menu = setMenu(parsedLoggedInUser);
//     data.routesMenu = setRouteOptions(parsedLoggedInUser);
//   } else {
//     return initialState;
//   }
//   return data;
// };

export default function reducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case LoginType.AUTHENTICATE: {
      st = {
        ...state,
        userInfo: action.userInfo
      };
      break;
    }

    case ErrorType.ERROR_LOG: {
      st = {
        ...state,
        message: action.message
      };
      break;
    }

    case LoginType.LOGIN_SUCCESSFUL: {
      const menu = setMenu(action.payload);
      const routeOptions = setRouteOptions(action.payload);
      return {
        ...state,
        loggedInUser: action.payload,
        menu,
        routesMenu: routeOptions
      };
    }

    case LoginType.LOGOUT_SUCCESSFUL: {
      return {
        ...state,
        loggedInUser: null,
        menu: [],
        routesMenu: []
      };
    }

    default: {
      return st;
    }
  }
  return st;
}
