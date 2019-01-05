import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import {
  fetchAcademicYears,
  setCurrentAcademicYear
} from '../../actions/AcademicYearActions';

class AcademicYears extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAcademicYears());
  }

  setCurrentAcademicYear = ({ id, academicYear }) => () => {
    this.props.dispatch(setCurrentAcademicYear({ id, academicYear }));
  };

  getAcademicYearsList = academicYears => {
    const { currentAcademicYear } = this.props;
    return academicYears.map(academicYear => (
      <ListGroupItem
        key={academicYear.id}
        active={academicYear.id === currentAcademicYear.id}
        onClick={this.setCurrentAcademicYear(academicYear)}
      >
        {academicYear.academicYear}
      </ListGroupItem>
    ));
  };

  render() {
    const { academicYears } = this.props;
    return (
      <ListGroup style={{ width: '80%' }}>
        {this.getAcademicYearsList(academicYears)}
      </ListGroup>
    );
  }
}

const mapStateToProps = state => ({
  academicYears: state.academicYears.academicYears,
  currentAcademicYear: state.academicYears.currentAcademicYear
});

export default connect(mapStateToProps)(AcademicYears);
