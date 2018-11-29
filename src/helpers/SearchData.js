import { values, unionWith, isEqual } from 'lodash';

export const filterDataOnSearch = (searchString, animalSpecies) =>
  animalSpecies.filter(({ updatedAt, createdAt, id, ...rest }) =>
    values(rest)
      .join('')
      .toLowerCase()
      .includes(searchString)
  );

export const applyingFilters = (stateData, processData, key) =>
  processData.filter(p => {
    if (stateData.map(pp => pp.value).indexOf(p[key]) >= 0) {
      return p;
    }
    return null;
  });

export const searchOutputFunc = (
  processFiltered,
  subprocessFiltered,
  regionFiltered,
  countryFiltered
) =>
  unionWith(
    processFiltered,
    subprocessFiltered,
    regionFiltered,
    countryFiltered,
    isEqual
  );

const coulmnSearchHelper = (filter, row) =>
  row[filter.id].toLowerCase().includes(filter.value.toLowerCase());

/* eslint-disable */
export const coulmnSearch = (filter, row) => {
  const column = row[filter.id];
  if (column) {
    return coulmnSearchHelper(filter, row);
  } else if (!column && row._subRows && row._subRows.length) {
    const searchArray = row._subRows.map(subRow =>
      coulmnSearch(filter, subRow)
    );
    return searchArray.includes(true);
  }
};
/* eslint-enable */
