import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { testDashboard } from '../../actions/DashboardAction';
import './Dashboard.scss';

class DashBoard extends React.Component {
  componentWillMount() {
    this.props.dispatch(testDashboard());
  }
  render() {
    console.log('test');
    console.log(this.props);
    return (
      <div className="tiles-container">

        <Link className="tile" to="MyTeam">
          <div className="tile-icon tile-icon-my-team"><div className="tile-icon-inner" /></div>
          <h2 className="tile-title">{this.props.translate('MyTeam')}</h2>
        </Link>

        <Link className="tile" to="PersonalInfo">
          <div className="tile-icon tile-icon-personal-information"><div className="tile-icon-inner" /></div>
          <h2 className="tile-title">{this.props.translate('PersonalInformation')}</h2>
        </Link>

        <Link className="tile" to="JobInfo">
          <div className="tile-icon tile-icon-job-info"><div className="tile-icon-inner" /></div>
          <h2 className="tile-title">{this.props.translate('JobInformation')}</h2>
        </Link>

        <Link className="tile" to="Compensation">
          <div className="tile-icon tile-icon-compensation"><div className="tile-icon-inner" /></div>
          <h2 className="tile-title">{this.props.translate('Compensation')}</h2>
        </Link>

        <Link className="tile" to="Benefits">
          <div className="tile-icon tile-icon-benefits"><div className="tile-icon-inner" /></div>
          <h2 className="tile-title">{this.props.translate('Benefits')}</h2>
        </Link>

        <Link className="tile" to="TimeOff">
          <div className="tile-icon tile-icon-time-off"><div className="tile-icon-inner" /></div>
          <h2 className="tile-title">{this.props.translate('TimeOff')}</h2>
        </Link>

        <Link className="tile" to="Organisation">
          <div className="tile-icon tile-icon-org-charts"><div className="tile-icon-inner" /></div>
          <h2 className="tile-title">{this.props.translate('OrgChart')}</h2>
        </Link>

        <Link className="tile" to="Workers">
          <div className="tile-icon tile-icon-workers-comparison"><div className="tile-icon-inner" /></div>
          <h2 className="tile-title">{this.props.translate('WorkersComparison')}</h2>
        </Link>

        <Link className="tile" to="Development">
          <div className="tile-icon tile-icon-development"><div className="tile-icon-inner" /></div>
          <h2 className="tile-title">{this.props.translate('Development')}</h2>
        </Link>

        <Link className="tile" to="Expenses">
          <div className="tile-icon tile-icon-expenses"><div className="tile-icon-inner" /></div>
          <h2 className="tile-title">{this.props.translate('Expenses')}</h2>
        </Link>

        <Link className="tile" to="Reports">
          <div className="tile-icon tile-icon-documentation"><div className="tile-icon-inner" /></div>
          <h2 className="tile-title">{this.props.translate('Reports')}</h2>
        </Link>

        <Link className="tile" to="Audit">
          <div className="tile-icon tile-icon-audit"><div className="tile-icon-inner" /></div>
          <h2 className="tile-title">{this.props.translate('Audit')}</h2>
        </Link>


      </div>
    );
  }
}

function mapStateToProps(state) {
  return { translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code,
    dashboard: state.dashboard };
}

export default connect(mapStateToProps)(DashBoard);
