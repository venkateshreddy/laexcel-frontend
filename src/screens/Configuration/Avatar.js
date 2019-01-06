import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import ReactAvatarEditor from 'react-avatar-editor';
import './Shared.scss';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.submit = this.submit.bind(this);
    this.close = this.close.bind(this);
    this.setZoomValue = this.setZoomValue.bind(this);
    this.setBorderRadius = this.setBorderRadius.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.showPreview = this.showPreview.bind(this);
    this.updatePreview = this.updatePreview.bind(this);
    this.convertToFile = this.convertToFile.bind(this);
    this.state = {
      fileName: undefined,
      fileType: undefined,
      img: null,
      image: props.image || undefined,
      zoomValue: 1,
      min: 0.1,
      max: 2,
      step: 0.01,
      brValue: 10,
      brMin: 1,
      brMax: 100,
      brStep: 1,
      rotate: 0,
      preview: null
    };
  }

  setZoomValue = (e) => {
    this.setState({ zoomValue: parseFloat(e.target.value) });
    if (this.state.preview) {
      this.showPreview();
    }
  }

  setEditorRef = editor => {
    if (editor) this.editor = editor;
  }

  setBorderRadius = (e) => {
    this.setState({ brValue: parseInt(e.target.value, 10) });
    if (this.state.preview) {
      this.showPreview();
    }
  }

  handleDrop = images => {
    this.setState({ image: images[0] });
    this.setState({ fileName: images[0].name });
    this.setState({ fileType: images[0].type });
    if (this.state.preview) {
      this.showPreview();
    }
  }

  showPreview = () => {
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    const rect = this.editor.getCroppingRect();
    this.setState({
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius
      }
    });
    this.setState({ img });
  }

  updatePreview = () => {
    if (this.state.preview) {
      this.showPreview();
    }
  }

  convertToFile = img =>
    fetch(img)
      .then(res => res.arrayBuffer())
      .then(buffer => {
        const file = new File([buffer], this.state.fileName, { type: this.state.fileType });
        return file;
      }
      )

  submit = () => {
    if (this.state.img) {
      // const file = this.convertToFile(this.state.img);
      // file
      //   .then(imgFile => {
      //     if (imgFile.name === this.state.fileName) {
      //       this.props.submit(imgFile);
      //     }
      //   }
      // );
      this.props.submit(this.state.img);
    }
  };

  close = () => this.props.close();

  rotateLeft = e => {
    e.preventDefault();
    this.setState({
      rotate: this.state.rotate - 90
    });
    if (this.state.preview) {
      this.showPreview();
    }
  }

  rotateRight = e => {
    e.preventDefault();
    this.setState({
      rotate: this.state.rotate + 90
    });
    if (this.state.preview) {
      this.showPreview();
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          Upload Image
          <button type="button" onClick={this.close} className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="imgUpload">
            <p>Drop the image below to upload it.</p>
            <Row>
              <Col lg={6} md={6} className="no-padding">
                <Dropzone
                  className="dropzone"
                  onDrop={this.handleDrop}
                  disableClick
                  accept="image/*"
                  multiple={false}
                >
                  <div>
                    <ReactAvatarEditor
                      ref={this.setEditorRef}
                      width={200}
                      height={200}
                      image={this.state.image}
                      borderRadius={this.state.brValue}
                      scale={this.state.zoomValue}
                      rotate={this.state.rotate}
                      onPositionChange={this.updatePreview}
                    />
                  </div>
                </Dropzone>
              </Col>
              <Col lg={6} md={6} className="np-right text-right">
                {!!this.state.preview && (
                  <img
                    alt=""
                    src={this.state.preview.img}
                    style={{
                      borderRadius: `${(Math.min(
                        this.state.preview.height,
                        this.state.preview.width
                      ) +
                        10) *
                        (this.state.preview.borderRadius / 2 / 100)}px`
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row className="margin-bottom10">
              <Col lg={3} md={3} className="no-padding">
                Zoom:
              </Col>
              <Col lg={9} md={9}>
                <input
                  type="range"
                  className="slider entry-input"
                  min={this.state.min}
                  max={this.state.max}
                  step={this.state.step}
                  value={this.state.zoomValue}
                  onChange={this.setZoomValue}
                />
              </Col>
            </Row>
            <Row className="margin-bottom10">
              <Col lg={3} md={3} className="no-padding">
                Border radius:
              </Col>
              <Col lg={9} md={9}>
                <input
                  type="range"
                  className="slider entry-input"
                  min={this.state.brMin}
                  max={this.state.brMax}
                  step={this.state.brStep}
                  value={this.state.brValue}
                  onChange={this.setBorderRadius}
                />
              </Col>
            </Row>
            <Row className="margin-bottom">
              <Col lg={3} md={3} className="no-padding">
                Rotate:
              </Col>
              <Col lg={9} md={9} className="rotate-arrows">
                <img src="/assets/images/icons/left-rotate-arrow.svg" onClick={this.rotateLeft} title="Rotate to left" alt="Rotate to left" />
                <img src="/assets/images/icons/right-rotate-arrow.svg" onClick={this.rotateRight} title="Rotate to right" alt="Rotate to right" />
                {/* <button onClick={this.rotateLeft}>Left</button>
                <button onClick={this.rotateRight}>Right</button> */}
              </Col>
            </Row>
            <div className="text-center">
              {
                this.state.preview === null ?
                  <input type="button" name="Submit" onClick={this.showPreview} value="Preview" className="form-control btn-primary custom-submit" />
                  :
                  <input type="button" name="Submit" onClick={this.submit} value="Submit" className="form-control btn-primary custom-submit" />
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Avatar;
