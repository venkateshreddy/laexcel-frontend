import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PreviousNextButtons = ({
  showPrevious,
  showNext,
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
  previousText,
  nextText,
  nextBsStyle
}) => (
  <Row style={{ margin: '10px' }}>
    <Col lg={6} md={6} sm={6}>
      {showPrevious && (
        <Button onClick={onPrevious} disabled={disablePrevious}>
          {previousText}
        </Button>
      )}
    </Col>
    <Col lg={6} md={6} sm={6} className="text-right">
      {showNext && (
        <Button bsStyle={nextBsStyle} onClick={onNext} disabled={disableNext}>
          {nextText}
        </Button>
      )}
    </Col>
  </Row>
);

PreviousNextButtons.defaultProps = {
  showPrevious: true,
  showNext: true,
  onPrevious: () => null,
  onNext: () => null,
  disablePrevious: false,
  disableNext: false,
  previousText: 'Previous',
  nextText: 'Next',
  nextBsStyle: 'primary'
};

PreviousNextButtons.propTypes = {
  showPrevious: PropTypes.bool,
  showNext: PropTypes.bool,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  disablePrevious: PropTypes.bool,
  disableNext: PropTypes.bool,
  previousText: PropTypes.string,
  nextText: PropTypes.string,
  nextBsStyle: PropTypes.string
};

export default PreviousNextButtons;
