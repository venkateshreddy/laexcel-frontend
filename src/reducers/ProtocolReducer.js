import { cloneDeep } from 'lodash';
import { ProtocolType, ProtocolToEthicalType } from '../actions/ActionType';

const initialState = {
  methods: [],
  parameters: [],
  devices: [],
  materials: [],
  announcements: [],
  protocols: [],
  protocolsToEthical: []
};

export default function reducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case ProtocolType.ERROR_LOG: {
      st = {
        ...state,
        message: 'Error.'
      };
      break;
    }
    case ProtocolType.FETCHED_PROTOCOLS: {
      st = {
        ...state,
        protocols: action.payload
      };
      break;
    }
    case ProtocolType.ADDED_ONE_PROTOCOL: {
      const { protocols } = st;
      const protocolsClone = cloneDeep(protocols);
      protocolsClone.push(action.payload);
      st = { ...state, protocols: protocolsClone };
      break;
    }
    case ProtocolType.EDITED_ONE_PROTOCOL: {
      const objectId = '_id';
      const { protocols } = st;
      const protocolsClone = [];
      protocols.map(protocol => {
        if (protocol[objectId] === action.payload[objectId]) {
          protocolsClone.push(action.payload);
        } else {
          protocolsClone.push(protocol);
        }
        return null;
      });
      st = { ...state, protocols: protocolsClone };
      break;
    }
    case ProtocolType.FETCHED_DATA_FOR_CREATE_PROTOCOL: {
      st = {
        ...state,
        announcements: action.payload.announcements,
        methods: action.payload.methods,
        parameters: action.payload.parameters,
        devices: action.payload.devices,
        materials: action.payload.materials,
        protocols: action.payload.protocols
      };
      break;
    }

    case ProtocolToEthicalType.FETCHED_DATA_PROTOCOL_TO_ETHICAL: {
      st = { ...state, protocolsToEthical: action.payload.result };
      break;
    }

    case ProtocolToEthicalType.CREATED_PROTOCOL_TO_ETHICAL: {
      const { protocolsToEthical } = st;
      const protocolsToEthicalClone = cloneDeep(protocolsToEthical);
      protocolsToEthicalClone.push(action.payload.result);
      st = { ...state, protocolsToEthical: protocolsToEthicalClone };
      break;
    }
    default: {
      return st;
    }
  }
  return st;
}
