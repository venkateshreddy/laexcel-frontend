const objectId = '_id';

export const idToObjectId = jsonArr =>
  jsonArr.map(obj => ({ _id: obj.id, ...obj }));

export const toggleTableRow = (selected, tableData) => {
  let selectedObj = {};
  tableData.map(row => {
    if (selected.indexOf(row[objectId]) >= 0) {
      selectedObj = { ...row };
    }
    return null;
  });
  return { selectedObj };
};

export const updateSingleObjInJSONArray = (jsonArr, selectedId, updatedObj) => {
  const newJson = [];
  let newJsonObj = {};
  jsonArr.map(obj => {
    newJsonObj = { ...obj };
    if (obj.id === selectedId) {
      newJsonObj = { ...updatedObj };
    }
    newJson.push(newJsonObj);
    return null;
  });
  return newJson;
};
