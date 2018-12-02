export const DashboardType = {
  GET_HEADER_COUNT: 'GET_HEADER_COUNT',
  GET_ALL_TRANSACTIONS: 'GET_ALL_TRANSACTIONS',
  SHOW_TRANSACTIONS_MODAL: 'SHOW_TRANSACTIONS_MODAL',
  HIDE_TRANSACTIONS_MODAL: 'HIDE_TRANSACTIONS_MODAL',
  GET_ALL_BLOCKS: 'GET_ALL_BLOCKS',
  SHOW_BLOCKS_MODAL: 'SHOW_BLOCKS_MODAL',
  HIDE_BLOCKS_MODAL: 'HIDE_BLOCKS_MODAL',
  GET_CHART_DATA: 'GET_CHART_DATA',
  // SEND_SEARCH_RESULT: 'SEND_SEARCH_RESULT',
  GLOBAL_SEARCH_TEXT: 'GLOBAL_SEARCH_TEXT',
  TOGGLE_GRID_VIEW: 'TOGGLE_GRID_VIEW',
  HANDLE_SNACKBAR: 'HANDLE_SNACKBAR',
  UPDATE_SPECIES_STATS: 'UPDATE_SPECIES_STATS'
};

export const ChatBotType = {
  INCHAT: 'INCHAT',
  OUTCHAT: 'OUTCHAT'
};

export const LoginType = {
  AUTHENTICATE: 'AUTHENTICATE',
  LOGIN_SUCCESSFUL: 'LOGIN_SUCCESSFUL',
  LOGOUT_SUCCESSFUL: 'LOGOUT_SUCCESSFUL'
};

export const Processes = {
  FETCH_PROCESS_DATA: 'FETCH_PROCESS_DATA',
  FETCH_ALL_PROCESSES: 'FETCH_ALL_PROCESSES'
};

export const PopupType = {
  TOGGLE_POPUP_VIEWS: 'TOGGLE_POPUP_VIEWS'
};

export const ErrorType = {
  ERROR_LOG: 'ERROR_LOG'
};

export const AnimalsType = {
  FETCHED_ANIMALS: 'FETCHED_ANIMALS',
  FETCHED_LAB_ANIMALS: 'FETCHED_LAB_ANIMALS',
  UPDATED_ANIMALS_DATA: 'UPDATED_ANIMALS_DATA',
  FETCH_CREATED_ANIMALS: 'FETCH_CREATED_ANIMALS',
  FETCH_SPECIE_AVAILABILITY: 'FETCH_SPECIE_AVAILABILITY',
  FETCH_SPECIE_AVAILABILITY_INEDIT: 'FETCH_SPECIE_AVAILABILITY_INEDIT',
  GET_REQUIRED_STATES: 'GET_REQUIRED_STATES',
  GET_REQUIRED_CITIES: 'GET_REQUIRED_CITIES',
  GET_REQUIRED_WAREHOUSES: 'GET_REQUIRED_WAREHOUSES',
  GET_REQUIRED_BUILDINGS: 'GET_REQUIRED_BUILDINGS',
  GET_REQUIRED_FLOORS: 'GET_REQUIRED_FLOORS',
  GET_REQUIRED_ROOMS: 'GET_REQUIRED_ROOMS',
  GET_REQUIRED_BOXES: 'GET_REQUIRED_BOXES',
  FETCH_DATA_FOR_RESOURCES_SCREEN: 'FETCH_DATA_FOR_RESOURCES_SCREEN',
  FETCH_DATA_FOR_ANIMALSTABLE_SCREEN: 'FETCH_DATA_FOR_ANIMALSTABLE_SCREEN',
  ANIMAL_CREATED: 'ANIMAL_CREATED'
};

export const ProtocolType = {
  FETCHED_PROTOCOLS: 'FETCHED_PROTOCOLS',
  ADDED_ONE_PROTOCOL: 'ADDED_ONE_PROTOCOL',
  EDITED_ONE_PROTOCOL: 'EDITED_ONE_PROTOCOL',
  FETCHED_DATA_FOR_CREATE_PROTOCOL: 'FETCHED_DATA_FOR_CREATE_PROTOCOL'
};

export const ProtocolToEthicalType = {
  FETCHED_DATA_PROTOCOL_TO_ETHICAL: 'FETCHED_DATA_PROTOCOL_TO_ETHICAL',
  CREATED_PROTOCOL_TO_ETHICAL: 'CREATED_PROTOCOL_TO_ETHICAL'
};

// export const AnimalSpecieType = {
//   CREATE_ANIMALSPECIE: 'CREATE_ANIMALSPECIE',
//   CREATE_ANIMAL_SUB_SPECIE: 'CREATE_ANIMAL_SUB_SPECIE'
// };

// export const AnimalGroupType = {
// CREATE_STUDY: 'CREATE_STUDY'
// };

export const AttributeType = {
  CREATE_ATTRIBUTE: 'CREATE_ATTRIBUTE'
};

export const AnnouncementType = {
  CREATE_ANNOUNCEMENT: 'CREATE_ANNOUNCEMENT',
  VIEW_ANNOUNCEMENTS: 'VIEW_ANNOUNCEMENTS',
  UPDATE_ANNOUNCEMENTS_STATUS: 'UPDATE_ANNOUNCEMENTS_STATUS',
  DATA_TILL_TAB3: 'DATA_TILL_TAB3',
  ANNOUNCEMENT_TO_EDIT: 'ANNOUNCEMENT_TO_EDIT',
  FETCHED_DATA_FOR_CREATE_ANNOUNCEMENT: 'FETCHED_DATA_FOR_CREATE_ANNOUNCEMENT',
  INITIAL_FETCH_FOR_ANNOUNCEMENT_PAGE: 'INITIAL_FETCH_FOR_ANNOUNCEMENT_PAGE'
};

export const UsersType = {
  FETCHED_USERS: 'FETCHED_USERS',
  ADDED_USER: 'ADDED_USER',
  DELETED_USERS: 'DELETED_USERS'
};

export const MasterDataType = {
  // species
  CREATE_SPECIES_SUPPLIER: 'CREATE_SPECIES_SUPPLIER',
  FETCH_SPECIES_SUPPLIERS: 'FETCH_SPECIES_SUPPLIERS',
  CREATE_SPECIES: 'CREATE_SPECIES',
  FETCH_SPECIES: 'FETCH_SPECIES',
  UPDATE_SPECIES: 'UPDATE_SPECIES',
  CREATE_SUB_SPECIES: 'CREATE_SUB_SPECIES',
  FETCH_SUB_SPECIES: 'FETCH_SUB_SPECIES',
  UPDATE_SUB_SPECIES: 'UPDATE_SUB_SPECIES',
  CREATE_SPECIE_COLORS: 'CREATE_SPECIE_COLORS',
  VIEW_SPECIE_COLORS: 'VIEW_SPECIE_COLORS',
  // materials
  CREATE_MATERIALS_SUPPLIER: 'CREATE_MATERIALS_SUPPLIER',
  GET_MATERIAL_SUPPLIERS: 'GET_MATERIAL_SUPPLIERS',
  CREATE_MATERIALS_DATA: 'CREATE_MATERIALS_DATA',
  GET_MATERIALS_DATA: 'GET_MATERIALS_DATA',
  UPDATE_MATERIALS_DATA: 'UPDATE_MATERIALS_DATA',
  REMOVE_MATERIAL_DATA: 'REMOVE_MATERIAL_DATA',
  // devices
  CREATE_DEVICES_SUPPLIER: 'CREATE_DEVICES_SUPPLIER',
  GET_DEVICE_SUPPLIERS: 'GET_DEVICE_SUPPLIERS',
  CREATE_DEVICE_DATA: 'CREATE_DEVICE_DATA',
  GET_DEVICES: 'GET_DEVICES',
  UPDATED_DEVICE_DATA: 'UPDATED_DEVICE_DATA',
  // methods
  CREATE_GLOBAL_METHODS: 'CREATE_GLOBAL_METHODS',
  GET_METHODS: 'GET_METHODS',
  UPDATE_METHOD_DATA: 'UPDATE_METHOD_DATA',
  // parameters
  CREATE_GLOBAL_PARAMETERS: 'CREATE_GLOBAL_PARAMETERS',
  GET_PARAMETERS: 'GET_PARAMETERS',
  UPDATE_PARAMETER: 'UPDATE_PARAMETER',
  // company id
  CREATE_COMPANY_ID: 'CREATE_COMPANY_ID',
  FETCH_COMPANYIDS: 'FETCH_COMPANYIDS',
  UPDATE_COMPANYID: 'UPDATE_COMPANYID',
  // warehouse
  CREATE_COUNTRY: 'CREATE_COUNTRY',
  FETCH_COUNTRIES: 'FETCH_COUNTRIES',
  UPDATE_COUNTRY: 'UPDATE_COUNTRY',
  CREATE_STATE: 'CREATE_STATE',
  FETCH_STATES: 'FETCH_STATES',
  UPDATE_STATE: 'UPDATE_STATE',
  CREATE_CITY: 'CREATE_CITY',
  FETCH_CITIES: 'FETCH_CITIES',
  UPDATE_CITY: 'UPDATE_CITY',
  CREATE_WAREHOUSE: 'CREATE_WAREHOUSE',
  FETCH_WAREHOUSES: 'FETCH_WAREHOUSES',
  UPDATE_WAREHOUSE: 'UPDATE_WAREHOUSE',
  CREATE_BUILDING: 'CREATE_BUILDING',
  FETCH_BUILDINGS: 'FETCH_BUILDINGS',
  UPDATE_BUILDING: 'UPDATE_BUILDING',
  CREATE_FLOOR: 'CREATE_FLOOR',
  FETCH_FLOORS: 'FETCH_FLOORS',
  UPDATE_FLOOR: 'UPDATE_FLOOR',
  CREATE_ROOM: 'CREATE_ROOM',
  FETCH_ROOMS: 'FETCH_ROOMS',
  UPDATE_ROOM: 'UPDATE_ROOM',
  CREATE_BOX: 'CREATE_BOX',
  FETCH_BOXES: 'FETCH_BOXES',
  UPDATE_BOX: 'UPDATE_BOX',
  WAREHOUSE_EDIT_ROW: 'WAREHOUSE_EDIT_ROW'
};

export const ProjectType = {
  GET_PROJECTS_DATA: 'GET_PROJECTS_DATA',
  GET_PROJECT_METHODS: 'GET_PROJECT_METHODS',
  GET_PROJECT_SPECIMETHODS: 'GET_PROJECT_SPECIMETHODS',
  SELECTED_METHODS_PARAMETERS: 'SELECTED_METHODS_PARAMETERS',
  GET_PROJECT_SPECIES: 'GET_PROJECT_SPECIES',
  GET_PROJECT_SPECIES_QUANTITY: 'GET_PROJECT_SPECIES_QUANTITY',
  SELECTED_PROJECT: 'SELECTED_PROJECT',
  GET_AVAILABLE_SPECIES: 'GET_AVAILABLE_SPECIES',
  SELECTED_ANIMALS_DATA: 'SELECTED_ANIMALS_DATA',
  ETHICAL_METHODS_PARAMETERS: 'ETHICAL_METHODS_PARAMETERS'
};

export const CreateProjectType = {
  CREATE_PROJECT: 'CREATE_PROJECT',
  GET_INITIAL_DATA_PROJECTS: 'GET_INITIAL_DATA_PROJECTS',
  GET_ANIMALS_ETHICAL_APPROVAL: 'GET_ANIMALS_ETHICAL_APPROVAL',
  GET_USED_SPECIES_DATA: 'GET_USED_SPECIES_DATA',
  GET_PROJECT_FOR_EDIT: 'GET_PROJECT_FOR_EDIT',
  EDIT_PROJECT: 'EDIT_PROJECT'
};

export const studyType = {
  CREATE_STUDY: 'CREATE_STUDY',
  SELECTED_STUDY: 'SELECTED_STUDY',
  UPDATE_STUDY_STATUS: 'UPDATE_STUDY_STATUS'
};

export const Branch = {
  CREATE_BRANCH: 'CREATE_BRANCH',
  FETCH_BRANCHES: 'FETCH_BRANCHES'
};

export const Cities = {
  FETCH_CITIES: 'FETCH_CITIES',
  CREATE_CITIES: 'CREATE_CITIES'
};

export const States = {
  FETCH_STATES: 'FETCH_STATES',
  CREATE_STATE: 'CREATE_STATE'
};

export const Organisations = {
  FETCH_ORGANISATIONS: 'FETCH_ORGANISATIONS',
  CREATE_ORGANISATION: 'CREATE_ORGANISATION'
};
