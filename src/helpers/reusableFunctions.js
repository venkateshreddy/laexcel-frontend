import renderHTML from 'react-render-html';
import { values, unionWith, isEqual } from 'lodash';
import moment from 'moment';

export const generateAnimalOptions = animals => {
  const objectId = '_id';
  const animalOptions = [];
  let optionObj = {};
  animals.map(anml => {
    optionObj = {};
    optionObj[objectId] = anml[objectId];
    optionObj.value = anml.uid;
    optionObj.label = `${anml.uid}-${anml.species.name}`;
    animalOptions.push(optionObj);
    return null;
  });
  return animalOptions;
};

export const generateAnimalSpecieOptions = animalSpecies => {
  const objectId = '_id';
  const animalSpeciesOptions = [];
  let optionObj = {};
  animalSpecies.map(anml => {
    optionObj = {};
    // optionObj[objectId] = anml[objectId];
    optionObj.value = anml[objectId];
    optionObj.label = `${anml.name}`;
    animalSpeciesOptions.push(optionObj);
    return null;
  });
  return animalSpeciesOptions;
};

export const generateAttributeOptions = attributes => {
  const objectId = '_id';
  const attributeOptions = [];
  let optionObj = {};
  attributes.map(attr => {
    optionObj = {};
    // optionObj[objectId] = attr[objectId];
    optionObj.value = attr[objectId];
    optionObj.label = `${attr.name}`;
    attributeOptions.push(optionObj);
    return null;
  });
  return attributeOptions;
};

export const generateMaterialOptions = materials => {
  const objectId = '_id';
  const materialOptions = [];
  let optionObj = {};
  materials.map(matrl => {
    optionObj = {};
    // optionObj[objectId] = attr[objectId];
    optionObj.value = matrl[objectId];
    optionObj.label = `${matrl.material}`;
    materialOptions.push(optionObj);
    return null;
  });
  return materialOptions;
};

export const generateDeviceOptions = devices => {
  const objectId = '_id';
  const deviceOptions = [];
  let optionObj = {};
  devices.map(devic => {
    optionObj = {};
    // optionObj[objectId] = attr[objectId];
    optionObj.value = devic[objectId];
    optionObj.label = `${devic.device}`;
    deviceOptions.push(optionObj);
    return null;
  });
  return deviceOptions;
};

export const renderAnimalSpeciesWithStats = (animalSpecies, animalsStats) => {
  const objectId = '_id';
  const animalSpeceieStats = {};
  animalSpecies.map(specie => {
    if (animalSpeceieStats[specie[objectId]] === undefined) {
      animalSpeceieStats[specie[objectId]] = {};
    }
    animalSpeceieStats[specie[objectId]].image = specie.image;
    animalSpeceieStats[specie[objectId]].name = specie.name;
    return null;
  });
  Object.keys(animalSpeceieStats).map(keyObj => {
    Object.keys(animalsStats).map(key => {
      if (key === keyObj) {
        animalSpeceieStats[keyObj].female = animalsStats[key].female;
        animalSpeceieStats[keyObj].male = animalsStats[key].male;
        animalSpeceieStats[keyObj].trans = animalsStats[key].trans;
        animalSpeceieStats[keyObj].available = animalsStats[key].available;
        animalSpeceieStats[keyObj].planned = animalsStats[key].planned;
        animalSpeceieStats[keyObj].inUse = animalsStats[key].inUse;
        // animalSpeceieStats[keyObj].used = animalsStats[key].Used;
        animalSpeceieStats[keyObj].alive = animalsStats[key].alive;
        animalSpeceieStats[keyObj].dead = animalsStats[key].dead;
        // animalSpeceieStats[keyObj].ordered = animalsStats[key].Ordered;
        animalSpeceieStats[keyObj].removed = animalsStats[key].removed;
        animalSpeceieStats[keyObj].newBorn = animalsStats[key].newBorn;
        animalSpeceieStats[keyObj].ethicalId = animalsStats[key].ethicalId;
        animalSpeceieStats[keyObj].projectId = animalsStats[key].projectId;
        animalSpeceieStats[keyObj].studyId = animalsStats[key].studyId;
        animalSpeceieStats[keyObj].total = animalsStats[key].total;
        animalSpeceieStats[keyObj].currentTotal =
          animalsStats[key].currentTotal;
      }
      return null;
    });
    return null;
  });
  return animalSpeceieStats;
};

export const availableAnimalsDropDown = (animalSpecies, animalsStats) => {
  const objectId = '_id';
  const availableAnimalOptionsArr = [];
  let optionsObj = {};
  animalSpecies.map(specie => {
    Object.keys(animalsStats).map(key => {
      optionsObj = {};
      if (specie[objectId] === key) {
        if (animalsStats[key].Available) {
          optionsObj.label = specie.name;
          optionsObj.value = specie[objectId];
          optionsObj.available = animalsStats[key].Available;
          optionsObj.male = animalsStats[key].male;
          optionsObj.female = animalsStats[key].female;
          availableAnimalOptionsArr.push(optionsObj);
        }
      }
      return null;
    });
    return null;
  });
  return availableAnimalOptionsArr;
};

export const generateStatusDropDown = animalStatuses => {
  const objectId = '_id';
  const animalStatusOptions = [];
  let optionObj = {};
  animalStatuses.map(status => {
    optionObj = {};
    optionObj[objectId] = status[objectId];
    optionObj.value = status[objectId];
    optionObj.label = `${status.name}`;
    animalStatusOptions.push(optionObj);
    return null;
  });
  return animalStatusOptions;
};

export const generateStatusDropDownForCreateAnimal = animalStatuses => {
  const objectId = '_id';
  const animalStatusOptions = [];
  let optionObj = {};
  animalStatuses.map(status => {
    optionObj = {};
    if (status.name === 'Alive' || status.name === 'Dead') {
      optionObj[objectId] = status[objectId];
      optionObj.value = status[objectId];
      optionObj.label = `${status.name}`;
      animalStatusOptions.push(optionObj);
    }
    return null;
  });
  return animalStatusOptions;
};

export const generateDropdownFromJson = jsonData => {
  const objectId = '_id';
  const dropDownOptions = [];
  let optionObj = {};
  jsonData.map(opt => {
    optionObj = {};
    optionObj[objectId] = opt[objectId];
    optionObj.value = opt[objectId];
    optionObj.label = `${opt.name}`;
    dropDownOptions.push(optionObj);
    return null;
  });
  return dropDownOptions;
};

export const convertHtmlToText = htmlText => {
  const enteredText = renderHTML(htmlText);
  if (enteredText.props) {
    if (enteredText.props.children[0].type === 'span') {
      return enteredText.props.children[0].props.children[0];
    }
    return enteredText.props.children[0];
  }
  return htmlText;
};

export const filterDataOnSearch = (searchString, jsonArray) =>
  jsonArray.filter(({ updatedAt, createdAt, id, ...rest }) =>
    values(rest)
      .join('')
      .toLowerCase()
      .includes(searchString)
  );

export const applyingFilters = (stateData, jsonArray, key) =>
  jsonArray.filter(p => {
    if (stateData.map(pp => pp.value).indexOf(p[key]) >= 0) {
      return p;
    }
    return null;
  });

export const searchOutputFunc = (
  filteredSpecieParam,
  filteredGlobalSpecieParam
) => unionWith(filteredSpecieParam, filteredGlobalSpecieParam, isEqual);

// ISO to Oct 10, 2018 format
export const ISOtoReadableDate = date => {
  const convDate = moment(date).format('ll');
  return convDate;
};

export const findAnimalStage = animalData => {
  let status = 'Available';
  if (animalData.selectAnimalStage === '5be3f2faa62d482058f1bf61') {
    status = 'New Born';
  }
  if (animalData.ethicalId) {
    status = 'Planned';
  }
  if (animalData.projectId) {
    status = 'In Use';
  }
  if (animalData.studyId) {
    status = 'In Use';
  }
  return status;
};

export const findAnimalMappingStatus = animalData => {
  let status = 'Available';
  if (animalData.ethicalId) {
    status = 'Ethical';
  }
  if (animalData.projectId) {
    status = 'Project';
  }
  if (animalData.studyId) {
    status = 'Study';
  }
  return status;
};
export const sortJsonLatestUpdateFirst = jsonArray => jsonArray.reverse();

// Warehouse
export const generateCountries = countries => {
  const selected = [];
  let obj = {};
  const key = '_id';
  if (countries.length > 0) {
    countries.map(vals => {
      obj = {};
      obj.label = vals.name;
      obj.value = vals[key];
      selected.push(obj);
      return null;
    });
  }
  return selected;
};

export const generateStates = states => {
  const selected = [];
  let obj = {};
  const key = '_id';
  if (states.length > 0) {
    states.map(vals => {
      obj = {};
      obj.label = vals.name;
      obj.value = vals[key];
      selected.push(obj);
      return null;
    });
  }
  return selected;
};

export const generateCities = cities => {
  const selected = [];
  let obj = {};
  const key = '_id';
  if (cities.length > 0) {
    cities.map(vals => {
      obj = {};
      obj.label = vals.name;
      obj.value = vals[key];
      selected.push(obj);
      return null;
    });
  }
  return selected;
};

export const generateWarehouses = warehouses => {
  const selected = [];
  let obj = {};
  const key = '_id';
  if (warehouses.length > 0) {
    warehouses.map(vals => {
      obj = {};
      obj.label = vals.name;
      obj.value = vals[key];
      selected.push(obj);
      return null;
    });
  }
  return selected;
};

export const generateBuildings = buildings => {
  const selected = [];
  let obj = {};
  const key = '_id';
  if (buildings.length > 0) {
    buildings.map(vals => {
      obj = {};
      obj.label = vals.name;
      obj.value = vals[key];
      selected.push(obj);
      return null;
    });
  }
  return selected;
};

export const generateFloors = floors => {
  const selected = [];
  let obj = {};
  const key = '_id';
  if (floors.length > 0) {
    floors.map(vals => {
      obj = {};
      obj.label = vals.name;
      obj.value = vals[key];
      selected.push(obj);
      return null;
    });
  }
  return selected;
};

export const generateRooms = rooms => {
  const selected = [];
  let obj = {};
  const key = '_id';
  if (rooms.length > 0) {
    rooms.map(vals => {
      obj = {};
      obj.label = vals.name;
      obj.value = vals[key];
      selected.push(obj);
      return null;
    });
  }
  return selected;
};

export const generateBoxes = boxes => {
  const selected = [];
  let obj = {};
  const key = '_id';
  if (boxes.length > 0) {
    boxes.map(vals => {
      obj = {};
      obj.label = vals.name;
      obj.value = vals[key];
      selected.push(obj);
      return null;
    });
  }
  return selected;
};

export const convertAnnouncementStatusToText = statusNumber => {
  if (statusNumber === 0) {
    return 'Pending';
  }
  if (statusNumber === 1) {
    return 'Approved';
  }
  if (statusNumber === 2) {
    return 'Rejected';
  }
  return '';
};

export const generateSpeciesColors = colors => {
  const selected = [];
  let obj = {};
  const key = '_id';
  if (colors.length > 0) {
    colors.map(vals => {
      obj = {};
      obj.label = vals.name;
      obj.value = vals[key];
      selected.push(obj);
      return null;
    });
  }
  return selected;
};

export const getBooleanToString = bool => {
  let data = '';
  if (bool === true) {
    data = 'Yes';
  } else {
    data = 'No';
  }
  return data;
};
