import { API_POST, API_GET } from './APIMethods';
import { Room, ErrorType } from './ActionType';
import { RoomURL } from './ActionURL';

export const createRoom = data => {
  const url = `${RoomURL.CREATE_ROOM}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Room.CREATE_ROOM,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const fetchRooms = data => {
  const url = `${RoomURL.FETCH_ROOMS}`;
  return async dispatch => {
    try {
      const result = await API_GET(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Room.FETCH_ROOMS,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};
