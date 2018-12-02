import { Room } from '../actions/ActionType';

const initialState = {
  rooms: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Room.CREATE_ROOM: {
      const rooms = [...state.rooms];
      rooms.unshift(action.payload);
      return { ...state, rooms };
    }
    case Room.FETCH_ROOMS: {
      return { ...state, rooms: action.payload };
    }
    default:
      return state;
  }
}
