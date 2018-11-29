import React from 'react';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';

import './Pagination.scss';

const CustomPagination = ({ activePage, totalPages, onChange }) => (
  <Pagination
    hideDisabled
    hideFirstLastPages
    hideNavigation
    pageRangeDisplayed={10}
    activePage={activePage}
    itemClass="default-li"
    linkClass="default-a"
    activeClass="selected-li"
    activeLinkClass="selected-a"
    itemsCountPerPage={8}
    totalItemsCount={totalPages}
    onChange={onChange}
  />
);

CustomPagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CustomPagination;
