import AppConfig from '../config';

export const LoginUrl = {
  AUTHENTICATE: `${AppConfig.API_BASE_URL}users/auth`,
  CHANGE_PASSWORD: `${AppConfig.API_BASE_URL}users/me/password/`
};
export const ChatBotUrl = {
  CHATBOT: 'https://api.wit.ai/message?v=04/10/2017&q='
};

export const ProcessesUrl = {
  BUSINESS_PROCESS_BASE: `${AppConfig.API_BASE_URL}processes`,
  PROCESS_DATA: `${AppConfig.API_BASE_URL}processData`,
  DOWNLOAD_CARDS: `${AppConfig.API_BASE_URL}processData/download`
};

export const UsersUrl = {
  SUBMIT_LOGIN: `${AppConfig.API_BASE_URL}users/submitlogin`,
  LOGIN: `${AppConfig.API_BASE_URL}users/login`,
  FETCH_USERS: `${AppConfig.API_BASE_URL}users/fetchusers`,
  UPDATE_ROLES: `${AppConfig.API_BASE_URL}users/updateroles`,
  ADD_USER: `${AppConfig.API_BASE_URL}users/adduser`,
  DELETE_USER: `${AppConfig.API_BASE_URL}users/deleteuser`,
  FETCH_USER_ON_REFRESH: `${AppConfig.API_BASE_URL}users/me`
};

export const AnimalsUrl = {
  FETCH_ANIMALS: `${AppConfig.API_BASE_URL}animals/fetchanimals`,
  FETCH_LAB_ANIMALS: `${AppConfig.API_BASE_URL}labanimals`,
  CREATE_ANIMAL: `${AppConfig.API_BASE_URL}animals/createanimal`,
  FETCH_SPECIE_AVAILABILITY: `${
    AppConfig.API_BASE_URL
  }animals/getavailablespecie`,
  FETCH_ANIMALS_BY_ANNOUNCEMENT: `${
    AppConfig.API_BASE_URL
  }animals/fetchanimalsbyannouncement`,
  FETCH_AVAILABLE_PLANNED_ANIMALS: `${
    AppConfig.API_BASE_URL
  }animals/fetchavailableplannedanimals`,
  FETCH_DATA_FOR_RESOURCES_SCREEN: `${
    AppConfig.API_BASE_URL
  }animals/fetchdataforresourcesscreen`,
  FETCH_DATA_FOR_ANIMALSTABLE_SCREEN: `${
    AppConfig.API_BASE_URL
  }animals/fetchdataforanimalstablescreen`
};

// export const AnimalSpecieUrl = {
//   CREATE_ANIMALSPECIE: `${AppConfig.API_BASE_URL}animalspecies/createspecie`
// };

export const OrderAnimalUrl = {
  // ORDER_ANIMALS: `${AppConfig.API_BASE_URL}orders/createorder`,
  GET_REQUIRED_STATES: `${AppConfig.API_BASE_URL}states/requiredstates`,
  GET_REQUIRED_CITIES: `${AppConfig.API_BASE_URL}cities/requiredcities`,
  GET_REQUIRED_WAREHOUSES: `${
    AppConfig.API_BASE_URL
  }warehouses/requiredwarehouses`,
  GET_REQUIRED_BUILDINGS: `${
    AppConfig.API_BASE_URL
  }buildings/requiredbuildings`,
  GET_REQUIRED_FLOORS: `${AppConfig.API_BASE_URL}floors/requiredfloors`,
  GET_REQUIRED_ROOMS: `${AppConfig.API_BASE_URL}rooms/requiredrooms`,
  GET_REQUIRED_BOXES: `${AppConfig.API_BASE_URL}boxes/requiredboxes`,
  CREATE_ANIMALS_DATA: `${AppConfig.API_BASE_URL}animals/createrecord`,
  UPDATE_ANIMALS_DATA: `${AppConfig.API_BASE_URL}animals/updateanimalsdata`
};

export const StudyUrl = {
  CREATE_STUDY: `${AppConfig.API_BASE_URL}studies/createstudy`,
  SUBMIT_STUDY_RESULT: `${AppConfig.API_BASE_URL}studies/submitstudyresult`
};

// export const AttributeUrl = {
//   CREATE_ATTRIBUTE: `${AppConfig.API_BASE_URL}attributes/createattribute`
// };

export const AnnouncementsUrl = {
  CREATE_ANNOUNCEMENT: `${
    AppConfig.API_BASE_URL
  }announcement/createannouncement`,
  UPDATE_ANNOUNCEMENT: `${
    AppConfig.API_BASE_URL
  }announcement/updateannouncement`,
  FETCH_ANNOUNCEMENTS: `${
    AppConfig.API_BASE_URL
  }announcement/viewannouncements`,
  UPDATE_ANNOUNCEMENT_STATUS: `${
    AppConfig.API_BASE_URL
  }announcement/updateannouncementstatus`,
  UPDATE_ANNOUNCEMENT_GOVT_STATUS: `${
    AppConfig.API_BASE_URL
  }announcement/updateannouncementgovtstatus`,
  FETCH_DATA_FOR_CREATE_ANNOUNCEMENT: `${
    AppConfig.API_BASE_URL
  }announcement/fetchdataforcreateannouncement`,
  FETCH_FOR_ANOUNCEMENTPAGE: `${
    AppConfig.API_BASE_URL
  }announcement/fetchforannouncementpage`
};

export const ProtocolUrl = {
  FETCH_PROTOCOLS: `${AppConfig.API_BASE_URL}protocol/fetchprotocols`,
  SUBMIT_ADD_PROTOCOL: `${AppConfig.API_BASE_URL}protocol/addprotocol`,
  SUBMIT_EDIT_PROTOCOL: `${AppConfig.API_BASE_URL}protocol/editprotocol`,
  FETCH_FOR_CREATE_PROTOCOL: `${
    AppConfig.API_BASE_URL
  }protocol/fetchdataforcreateprotocol`
};

export const ProtocolToEthicalUrl = {
  FETCH_PROTOCOL_TO_ETHICAL: `${
    AppConfig.API_BASE_URL
  }protocoltoethical/fetchprotocolToEthical`,
  CREATE_PROTOCOL_TO_ETHICAL: `${
    AppConfig.API_BASE_URL
  }protocoltoethical/create`,
  UPDATE_PROTOCOL_TO_ETHICAL_STATUS: `${
    AppConfig.API_BASE_URL
  }protocoltoethical/updatestatus`
};

export const MasterDataURL = {
  // SPECIES
  CREATE_SPECIES: `${AppConfig.API_BASE_URL}animalspecies/createspecie`,
  FETCH_SPECIES: `${AppConfig.API_BASE_URL}animalspecies/fetchanimalspecies`,
  UPDATE_SPECIES: `${AppConfig.API_BASE_URL}animalspecies/updatespecies`,
  CREATE_SUB_SPECIES: `${AppConfig.API_BASE_URL}subspezies/createsubspecie`,
  FETCH_SUB_SPECIES: `${AppConfig.API_BASE_URL}subspezies/fetchsubspecie`,
  UPDATE_SUB_SPECIES: `${AppConfig.API_BASE_URL}subspezies/updatesubspecie`,
  CREATE_SPECIE_COLORS: `${AppConfig.API_BASE_URL}speciecolors/createcolors`,
  FETCH_SPECIE_COLORS: `${AppConfig.API_BASE_URL}speciecolors`,
  // METHODS
  CREATE_METHODS: `${AppConfig.API_BASE_URL}methods/createmethods`,
  GET_METHODS: `${AppConfig.API_BASE_URL}methods/getMethods`,
  UPDATE_METHOD_DATA: `${AppConfig.API_BASE_URL}methods/updatemethod`,
  // PARAMETERS
  CREATE_PARAMETERS: `${AppConfig.API_BASE_URL}parameters/createparameters`,
  GET_PARAMETERS: `${AppConfig.API_BASE_URL}parameters/fetchParameters`,
  UPDATE_PARAMETER: `${AppConfig.API_BASE_URL}parameters/updateParameters`,
  // COMPANY ID
  CREATE_COMPANY_ID: `${AppConfig.API_BASE_URL}companyids/createConfig`,
  FETCH_COMPANYIDS: `${AppConfig.API_BASE_URL}companyids`,
  UPDATE_COMPANYID: `${AppConfig.API_BASE_URL}companyids/updatedata`,
  // COUNTRY
  CREATE_COUNTRY: `${AppConfig.API_BASE_URL}country/addCountry`,
  FETCH_COUNTRIES: `${AppConfig.API_BASE_URL}country`,
  UPDATE_COUNTRY: `${AppConfig.API_BASE_URL}country/updatecountry`,
  // STATE
  CREATE_STATE: `${AppConfig.API_BASE_URL}states/addstates`,
  FETCH_STATES: `${AppConfig.API_BASE_URL}states`,
  UPDATE_STATE: `${AppConfig.API_BASE_URL}states/updatestate`,
  // CITY
  CREATE_CITY: `${AppConfig.API_BASE_URL}cities/addcity`,
  FETCH_CITIES: `${AppConfig.API_BASE_URL}cities`,
  UPDATE_CITY: `${AppConfig.API_BASE_URL}cities/updatecity`,
  // WAREHOUSE
  CREATE_WAREHOUSE: `${AppConfig.API_BASE_URL}warehouses/addwarehouse`,
  FETCH_WAREHOUSES: `${AppConfig.API_BASE_URL}warehouses`,
  UPDATE_WAREHOUSE: `${AppConfig.API_BASE_URL}warehouses/updatedata`,
  // BUILDING
  CREATE_BUILDING: `${AppConfig.API_BASE_URL}buildings/addbuilding`,
  FETCH_BUILDINGS: `${AppConfig.API_BASE_URL}buildings`,
  UPDATE_BUILDING: `${AppConfig.API_BASE_URL}buildings/updatedata`,
  // FLOOR
  CREATE_FLOOR: `${AppConfig.API_BASE_URL}floors/addfloor`,
  FETCH_FLOORS: `${AppConfig.API_BASE_URL}floors`,
  UPDATE_FLOOR: `${AppConfig.API_BASE_URL}floors/updatedata`,
  // ROOM
  CREATE_ROOM: `${AppConfig.API_BASE_URL}rooms/addroom`,
  FETCH_ROOMS: `${AppConfig.API_BASE_URL}rooms`,
  UPDATE_ROOM: `${AppConfig.API_BASE_URL}rooms/updatedata`,
  // BOX
  CREATE_BOX: `${AppConfig.API_BASE_URL}boxes/addbox`,
  FETCH_BOXES: `${AppConfig.API_BASE_URL}boxes`,
  UPDATE_BOX: `${AppConfig.API_BASE_URL}boxes/updatedata`,
  // MATERIALS
  CREATE_MATERIALS_SUPPLIER: `${
    AppConfig.API_BASE_URL
  }materialsuppliers/createdata`,
  GET_MATERIAL_SUPPLIERS: `${AppConfig.API_BASE_URL}materialsuppliers`,
  CREATE_MATERIALS_DATA: `${AppConfig.API_BASE_URL}materials/createdata`,
  GET_MATERIALS_DATA: `${AppConfig.API_BASE_URL}materials`,
  UPDATE_MATERIALS_DATA: `${AppConfig.API_BASE_URL}materials/updatedata`,
  REMOVE_MATERIAL_DATA: `${AppConfig.API_BASE_URL}materials/removedata`,
  // DEVICES
  CREATE_DEVICES_SUPPLIER: `${
    AppConfig.API_BASE_URL
  }devicesuppliers/createdata`,
  GET_DEVICE_SUPPLIERS: `${AppConfig.API_BASE_URL}devicesuppliers/fetchdata`,
  CREATE_DEVICE_DATA: `${AppConfig.API_BASE_URL}devices/createdata`,
  GET_DEVICES: `${AppConfig.API_BASE_URL}devices`,
  UPDATE_DEVICE_DATA: `${AppConfig.API_BASE_URL}devices/updatedata`,
  REMOVE_DEVICE_DATA: `${AppConfig.API_BASE_URL}devices/removedata`,
  CREATE_SPECIES_SUPPLIER: `${AppConfig.API_BASE_URL}suppliers/createdata`,
  FETCH_SPECIES_SUPPLIERS: `${AppConfig.API_BASE_URL}suppliers`
};

export const ProjectsURL = {
  GET_PROJECTS: `${AppConfig.API_BASE_URL}projects`,
  GET_PROJECTS_METHODS: `${AppConfig.API_BASE_URL}projects/getProjectMethods`,
  GET_AVAILABLE_SPECIES: `${AppConfig.API_BASE_URL}projects/getAnimals`
};
export const CreateProjectURL = {
  CREATE_PROJECT: `${AppConfig.API_BASE_URL}projects/createProject`,
  GET_ANIMALS_ETHICAL_APPROVAL: `${AppConfig.API_BASE_URL}projects/animals`,
  GET_INITIAL_DATA: `${AppConfig.API_BASE_URL}projects/getInitialData`,
  FETCH_USED_SPECIES_DATA: `${AppConfig.API_BASE_URL}projects/usedCount`,
  GET_PROJECT_FOR_EDIT: `${AppConfig.API_BASE_URL}projects/getProject`,
  EDIT_PROJECT: `${AppConfig.API_BASE_URL}projects/`,
  GET_ANIMALS_AND_USED_COUNT: `${AppConfig.API_BASE_URL}projects/dataForEthical`
};
export const studyUrl = {
  CREATE_STUDY: `${AppConfig.API_BASE_URL}studies`,
  FETCH_STUDIES: `${AppConfig.API_BASE_URL}studies/fetchStudies`,
  UPDATE_STUDY_STATUS: `${AppConfig.API_BASE_URL}studies/updateStudyStatus`
};
export const AuditsUrl = {
  FETCH_AUDITS: `${AppConfig.API_BASE_URL}audits`
};

export const BranchURL = {
  CREATE_BRANCH: `${AppConfig.API_BASE_URL}branches`,
  FETCH_BRANCHES: `${AppConfig.API_BASE_URL}branches`
};

export const CitiesURL = {
  FETCH_CITIES: `${AppConfig.API_BASE_URL}cities`,
  CREATE_CITIES: `${AppConfig.API_BASE_URL}cities`,
  DELETE_CITIES: `${AppConfig.API_BASE_URL}cities/delete`,
  UPDATE_CITY: `${AppConfig.API_BASE_URL}cities`
};

export const StatesURL = {
  FETCH_STATES: `${AppConfig.API_BASE_URL}states`,
  CREATE_STATE: `${AppConfig.API_BASE_URL}states`,
  DELETE_STATE: `${AppConfig.API_BASE_URL}states/delete`,
  UPDATE_STATE: `${AppConfig.API_BASE_URL}states`
};

export const OrganisationsURL = {
  FETCH_ORGANISATIONS: `${AppConfig.API_BASE_URL}organizations`,
  CREATE_ORGANISATION: `${AppConfig.API_BASE_URL}organizations/create`,
  DELETE_ORGANISATION: `${AppConfig.API_BASE_URL}organizations/delete`,
  UPDATE_ORGANISATION: `${AppConfig.API_BASE_URL}organizations/`
};

export const CampusURL = {
  CREATE_CAMPUS: `${AppConfig.API_BASE_URL}campuses`,
  FETCH_CAMPUSES: `${AppConfig.API_BASE_URL}campuses`
};

export const RoomURL = {
  CREATE_ROOM: `${AppConfig.API_BASE_URL}room`,
  FETCH_ROOMS: `${AppConfig.API_BASE_URL}room`
};
