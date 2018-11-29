import { API_GET, API_POST } from './APIMethods';
import {
  AnimalsType,
  AttributeType,
  AnnouncementType,
  ErrorType
  // MasterDataType
} from './ActionType';
import {
  AnimalsUrl,
  AttributeUrl,
  AnnouncementsUrl
  // MasterDataURL
} from './ActionURL';

export const fetchAnimals = () => {
  const url = `${AnimalsUrl.FETCH_ANIMALS}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (!result.error) {
        dispatch({
          type: AnimalsType.FETCHED_ANIMALS,
          payload: result
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const fetchLabAnimals = () => {
  const url = `${AnimalsUrl.FETCH_LAB_ANIMALS}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (!result.error) {
        dispatch({
          type: AnimalsType.FETCHED_LAB_ANIMALS,
          payload: result
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const createAnimal = data => {
  const url = `${AnimalsUrl.CREATE_ANIMAL}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      console.log('cretaed animal', result);
      // if (!result.error) {
      // dispatch({
      //   type: AnimalsType.FETCHED_ANIMALS,
      //   payload: result
      // });
      // }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const createAttribute = (data, callBack) => {
  const url = `${AttributeUrl.CREATE_ATTRIBUTE}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      // console.log('result', result);
      if (!result.error) {
        dispatch({
          type: AttributeType.CREATE_ATTRIBUTE,
          payload: result.data
        });
      }
      callBack(result);
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const createAnnouncement = (data, callBack) => {
  const url = `${AnnouncementsUrl.CREATE_ANNOUNCEMENT}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (!result.error) {
        dispatch({
          type: AnnouncementType.CREATE_ANNOUNCEMENT,
          payload: result.data
        });
      }
      callBack(result);
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const updateAnnouncement = (data, id, callBack) => {
  const url = `${AnnouncementsUrl.UPDATE_ANNOUNCEMENT}/${id}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (!result.error) {
        dispatch({
          type: AnnouncementType.CREATE_ANNOUNCEMENT,
          payload: result.data
        });
      }
      callBack(result);
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const fetchAnnouncements = () => {
  const url = `${AnnouncementsUrl.FETCH_ANNOUNCEMENTS}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (!result.error) {
        // console.log(result);
        dispatch({
          type: AnnouncementType.VIEW_ANNOUNCEMENTS,
          payload: result
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const updateAnnouncementStatus = (data, id, callBack) => {
  const url = `${AnnouncementsUrl.UPDATE_ANNOUNCEMENT_STATUS}/${id}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (!result.error) {
        dispatch({
          type: AnnouncementType.UPDATE_ANNOUNCEMENTS_STATUS,
          payload: result.data
        });
      }
      callBack(result);
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const updateAnnouncementGovtStatus = (data, id, callBack) => {
  const url = `${AnnouncementsUrl.UPDATE_ANNOUNCEMENT_GOVT_STATUS}/${id}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (!result.error) {
        dispatch({
          type: AnnouncementType.UPDATE_ANNOUNCEMENTS_STATUS,
          payload: result.data
        });
      }
      callBack(result);
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const getSpecieAvailability = id => {
  const url = `${AnimalsUrl.FETCH_SPECIE_AVAILABILITY}/${id}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (!result.error) {
        // dispatch({
        //   type: AnimalsType.FETCH_SPECIE_AVAILABILITY,
        //   payload: result.result
        // });
      }
      return result;
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
    return null;
  };
};

export const getAvailableAndPlannedSpecies = (id, announcementId) => {
  const url = `${
    AnimalsUrl.FETCH_AVAILABLE_PLANNED_ANIMALS
  }/${id}/${announcementId}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (!result.error) {
        // dispatch({
        //   type: AnimalsType.FETCH_SPECIE_AVAILABILITY,
        //   payload: result.result
        // });
      }
      return result;
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
    return null;
  };
};

export const fetchDataForAnimalsTablePage = () => {
  const url = `${AnimalsUrl.FETCH_DATA_FOR_ANIMALSTABLE_SCREEN}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (!result.error) {
        dispatch({
          type: AnimalsType.FETCH_DATA_FOR_ANIMALSTABLE_SCREEN,
          payload: result
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};
