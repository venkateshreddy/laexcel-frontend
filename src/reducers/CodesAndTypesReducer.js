import { SourceType, AgencyCode } from '../actions/ActionType';
import { updateSingleObjInJSONArray } from '../helpers/reusableFunctions';

const initialState = {
  sourceTypes: [],
  agencyCodes: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SourceType.FETCH_SOURCETYPES: {
      return { ...state, sourceTypes: action.payload };
    }
    case SourceType.CREATE_SOURCETYPE: {
      const sourceTypes = [...state.sourceTypes];
      sourceTypes.unshift(action.payload);
      return { ...state, sourceTypes };
    }
    case SourceType.UPDATE_SOURCETYPE: {
      const sourceTypes = [...state.sourceTypes];
      const updatedJson = updateSingleObjInJSONArray(
        sourceTypes,
        action.payload.id,
        action.payload
      );
      return { ...state, sourceTypes: updatedJson };
    }

    case AgencyCode.FETCH_AGENCYCODES: {
      return { ...state, agencyCodes: action.payload };
    }
    case AgencyCode.CREATE_AGENCY: {
      const agencyCodes = [...state.agencyCodes];
      agencyCodes.unshift(action.payload);
      return { ...state, agencyCodes };
    }
    case AgencyCode.UPDATE_AGENCY: {
      const agencyCodes = [...state.agencyCodes];
      const updatedJson = updateSingleObjInJSONArray(
        agencyCodes,
        action.payload.id,
        action.payload
      );
      return { ...state, agencyCodes: updatedJson };
    }
    default:
      return state;
  }
}
