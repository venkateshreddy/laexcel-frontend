import { Building } from '../actions/ActionType';

const initialState = {
  buildings: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Building.CREATE_BUILDING: {
      const buildings = [...state.buildings];
      buildings.unshift(action.payload);
      return { ...state, buildings };
    }
    case Building.FETCH_BUILDINGS: {
      return { ...state, buildings: action.payload };
    }
    case Building.UPDATE_BUILDING: {
      const buildings = [...state.buildings];
      const buildingClone = [];
      let buildingCloneObj = {};
      buildings.map(org => {
        buildingCloneObj = { ...org };
        if (org.id === action.payload.id) {
          buildingCloneObj = { ...action.payload };
        }
        buildingClone.push(buildingCloneObj);
        return null;
      });
      return { ...state, buildings: buildingClone };
    }
    default:
      return state;
  }
}
