import { findIndex } from 'lodash';
import { Room } from '../actions/ActionType';

const initialState = {
  rooms: [],
  form: {
    floorNumberOptions: []
  }
};

const updateRoom = (state, action) => {
  const rooms = [...state.rooms];
  const index = findIndex(rooms, { id: action.payload.id });
  if (index >= 0) {
    rooms[index] = action.payload;
  }
  return { ...state, rooms };
};

const deleteRooms = (state, action) => {
  const rooms = state.rooms.filter(
    room => !action.payload.ids.includes(room.id)
  );
  return { ...state, rooms };
};

const floorsByBuilding = (state, action) => {
  const form = [...state.form];
  form.floorNumberOptions = action.payload;
  return { ...state, form };
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
    case Room.UPDATE_ROOM: {
      return updateRoom(state, action);
    }
    case Room.DELETE_ROOMS: {
      return deleteRooms(state, action);
    }
    case Room.FLOORS_BY_BUILDING: {
      return floorsByBuilding(state, action);
    }
    default:
      return state;
  }
}
