/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import XLSX from 'xlsx';
import { SnackBar } from '../../components/SnackBar';
import { handleSnackBar } from '../../actions/DashboardAction';
import { bulkUpload } from '../../actions/AdmissionAction';
import { FieldGroup, FieldSelect } from '../../components/Form';
import CheckBoxTable from '../../components/Table/CheckboxTable';

class PreAdmission extends Component {
  constructor() {
    super();
    this.state = {
      selectedOrganisations: [],
      filterable: false,
      sourceType: undefined,
      agencyCode: '',
      selectedRecords: [],
      activeTab: 'UPLOAD',
      rows: [],
      columns: [
        { Header: 'Program', accessor: 'Program' },
        { Header: 'StudentName', accessor: 'StudentName' },
        { Header: 'ContactNumber', accessor: 'ContactNumber' },
        { Header: 'Email', accessor: 'Email' }
      ]
    };
  }
  handleSelect = (activeTab) => {
    this.setState({ activeTab });
  }
  clearValues = (proceed) => {
    if (proceed || confirm('Do you want to delete all the rows?')) {
      this.setState({
        rows: [],
        columns: [
          { Header: 'Program', accessor: 'Program' },
          { Header: 'StudentName', accessor: 'StudentName' },
          { Header: 'ContactNumber', accessor: 'ContactNumber' },
          { Header: 'Email', accessor: 'Email' }
        ],
        sourceType: undefined,
        agencyCode: ''
      });
    }
  }
  uploadValues = () => {
    const columns = this.state.columns.map(column => column.accessor);
    if (columns.indexOf('Email') < 0 || columns.indexOf('ContactNumber') < 0 || columns.indexOf('Program') < 0 || columns.indexOf('StudentName') < 0)
    {
      this.props.dispatch(
        handleSnackBar({ snackBarOpen: true, snackBarMsg: 'Mandatory columns missing. Please see the note above the table.' })
      )
    } else if (!this.state.sourceType) {
      this.props.dispatch(
        handleSnackBar({ snackBarOpen: true, snackBarMsg: 'Source type can not be empty' })
      )
    } else if (!this.state.agencyCode || this.state.agencyCode === '') {
      this.props.dispatch(
        handleSnackBar({ snackBarOpen: true, snackBarMsg: 'Agency code can not be empty' })
      )
    } else if (this.state.rows.length === 0) {
      this.props.dispatch(
        handleSnackBar({ snackBarOpen: true, snackBarMsg: `You've not uploaded any rows` })
      )
    } else {
      const mandatoryColumns = ['Program', 'StudentName', 'ContactNumber', 'Email'];
      const rows = this.state.rows.map(row => {
        const obj = {
          sourceType: this.state.sourceType,
          agencyCode: this.state.agencyCode,
          others: {},
          type: 'UPLOAD'
        };
        columns.map(column => {
          if (mandatoryColumns.indexOf(column) >= 0) {
            obj[column] = row[column];
          } else {
            obj.others[column] = row[column];
          }
        });
        return obj;
      });
      this.props.dispatch(bulkUpload(rows))
      .then(() => {
        this.props.dispatch(
          handleSnackBar({ snackBarOpen: true, snackBarMsg: `Upload Success` })
        )
        this.clearValues(true);
      })
      .catch((err) => {
        this.props.dispatch(
          handleSnackBar({ snackBarOpen: true, snackBarMsg: `Upload Failed. Please try again.` })
        )
      })
    }
  }
  onDrop = (acceptedFiles) => {
    const opts = {
      errors: {
        badfile() {
          alert('This file does not appear to be a valid Excel file. If we made a mistake, please send this file to <a href="mailto:saravanakvp1983@gmail.com?subject=I+broke+your+stuff">saravanakvp1983@gmail.com</a> so we can take a look.', () => { });
        },
        pending() {
          alert('Please wait until the current file is processed.', () => { });
        },
        large(len, cb) {
          confirm(`This file is ${len} bytes and may take a few moments.  Your browser may lock up during this process.  Shall we play?`, cb);
        },
        failed(e) {
          alert('We unfortunately dropped the ball here.  We noticed some issues with the grid recently, so please test the file using the <a href="/js-xlsx/">raw parser</a>.  If there are issues with the file processor, please send this file to <a href="mailto:venkatesh_kalikiri@mcbitsstech.com?subject=I+broke+your+stuff">venkatesh_kalikiri@mcbitsstech.com</a> so we can make things right.', () => { });
        }
      },
      on: {
        sheet: (json, sheetnames) => {
          let headerArr = [];
          const jsonObject = [];
          if (!json) json = [];
          headerArr = json[0];
          json.forEach((record, rowIndex) => {
            if (rowIndex > 0) {
              const obj = {};

              record.forEach((item, colIndex) => {
                obj[headerArr[colIndex]] = item;
              });

              obj.rowIndex = rowIndex;

              jsonObject.push(obj);
            }
          });
          json.splice(0, 1);
          const columns = this.state.columns;
          headerArr.map(column => {
            if (['StudentName', 'Program', 'ContactNumber', 'Email'].indexOf(column) < 0) {
              columns.push({ Header: column, accessor: column });
            }
          })
          this.setState({ rows: jsonObject, columns  });
        }
      }
    };
    const rABS = typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsBinaryString;
    const f = acceptedFiles[0];
    const reader = new FileReader();
    function fixdata(data) {
      let o = '',
        l = 0,
        w = 10240;
      for (; l < data.byteLength / w; ++l) { o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w))); }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(o.length)));
      return o;
    }

    function to_json(workbook) {
      const result = {};
      workbook.SheetNames.forEach((sheetName) => {
        try {
          const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
          if (roa.length > 0) result[sheetName] = roa;
        }
        catch (e) { console.log(e); }
      });
      return result;
    }


    function process_wb(wb, sheetidx) {
      const sheet = wb.SheetNames[sheetidx || 0];
      const json = to_json(wb)[sheet];
      opts.on.sheet(json, wb.SheetNames);
    }

    const name = f.name;
    reader.onload = function (e) {
      let data = e.target.result;
      let wb,
        arr;
      const readtype = { type: rABS ? 'binary' : 'base64' };
      if (!rABS) {
        arr = fixdata(data);
        data = btoa(arr);
      }
      function doit() {
        try {
          wb = XLSX.read(data, readtype);
          process_wb(wb);
        } catch (e) { console.log(e); opts.errors.failed(e); }
      }

      if (e.target.result.length > 1e6) opts.errors.large(e.target.result.length, (e) => { if (e) doit(); });
      else { doit(); }
    };
    if (rABS) {
      reader.readAsBinaryString(f);
    } else {
      reader.readAsArrayBuffer(f);
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  } 
  render() {
    let dropzoneRef;
    return (
      <Tabs
          activeKey={this.state.activeTab}
          onSelect={this.handleSelect}
          id="noanim-tab-example"
        >
          <Tab eventKey={'FORM'} title="Input Form">
            <span>Coming soon</span>
          </Tab>
          <Tab eventKey={'UPLOAD'} title="Mass Upload">
            <Row>
              <Col lg={12} md={12} sm={12} xs={12}>
                <div className="browse-wrap padding">
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <div class="form-group has-feedback">
                      <label for="sourceType" class="control-label">Source Type *</label>
                      <select placeholder="Choose Source Type" type="text" value={this.state.sourceType} onChange={this.handleChange} id="sourceType" class="form-control">
                        <option value={undefined}>Select</option>
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                        <option value="Website">Website</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <div class="form-group has-feedback">
                      <label for="agencyCode" class="control-label">Agency Code *</label>
                      <input placeholder="Agency Code" onChange={this.handleChange} type="text" id="agencyCode" class="form-control" value={this.state.agencyCode} />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <span style={{ fontSize: '10px' }}>Note*: The below given default fields are mandatory in excel sheet.</span>
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={6} style={{ textAlign: 'right' }}>
                    <div>
                      <Dropzone style={{ float: 'right', marginRight: '1%' }} ref={(node) => { let dropzoneRef = node; }} multiple={false} onDrop={(files) => this.onDrop(files)} className="custom-file-container__custom-file__custom-file-control">
                        <i onClick={this.uploadExcel} title="Choose Excel" className="fa fa-upload" style={{ margin: '5px', cursor: 'pointer' }} />
                      </Dropzone>
                      {/* <i title="Download Template" className="fa fa-download" style={{ margin: '5px', cursor: 'pointer' }} /> */}
                    </div>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <CheckBoxTable
                      enableMultiSelect
                      enableSelectAll={false}
                      selection={this.state.selectedRecords}
                      selectAll={false}
                      data={this.state.rows}
                      columns={this.state.columns}
                      filterable={this.state.filterable}
                    />
                  </Col>
                  <Col lg={10} md={10} sm={10} xs={10}>
                    
                  </Col>
                  <Col>
                    { this.state.rows.length > 0 &&
                      <div>
                        <button type="button" className="btn btn-custom btn-rounded btn-bordered waves-effect w-xxs waves-light ml-2" onClick={this.clearValues} title="Clear Rows" style={{ cursor: 'pointer', margin: '1%' }}>Clear</button>
                        <button type="button" className="btn btn-primary btn-rounded btn-bordered waves-effect w-xxs waves-light ml-2" onClick={this.uploadValues} title="Save Records" style={{ cursor: 'pointer', margin: '1%' }}>Upload</button>
                      </div>
                    }
                  </Col>
                  <div>
                    <SnackBar
                      open={this.props.snackBarOpen}
                      onClose={() =>
                        this.props.dispatch(
                          handleSnackBar({ snackBarOpen: false, snackBarMsg: '' })
                        )
                      }
                      msg={this.props.snackBarMsg}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({
  snackBarOpen: state.dashboard.snackBarOpen,
  snackBarMsg: state.dashboard.snackBarMsg,
  organisations: state.organisations.organisations
});

export default connect(mapStateToProps)(PreAdmission);
