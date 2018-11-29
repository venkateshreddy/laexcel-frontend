import React, { Component } from 'react';
import { connect } from 'react-redux';
import { previewBusinessCards } from '../../actions/ProcessActions';

class PreviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
  }
  /* eslint-disable */
  componentDidMount() {
    const { template, processes } = this.props;
    if (template && processes.length > 0) {
      const postFunction = url => {
        this.setState({ url: url });
      };
      this.props.dispatch(
        previewBusinessCards(
          {
            templateId: template,
            ids: processes,
            type: 'PDF'
          },
          postFunction
        )
      );
    } else {
      alert('Please select data and respective template to proceed further.');
    }
  }
  /* eslint-enable */
  render() {
    return (
      <div>
        <embed
          src={this.state.url}
          type="application/pdf"
          alt="preview"
          style={{ height: 500, width: 750 }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  countries: state.businessProcess.countries
});
export default connect(mapStateToProps)(PreviewModal);
