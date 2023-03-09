import React, { Component } from 'react';
import styled from 'styled-components';
import './styles.css';
import {
  FormGroup,
  Card,
  Button,
  Dialog,
  Text,
  H4,
  EditableText,
  TextArea,
  Popover,
  Toaster,
  Toast,
  Elevation,
  ButtonGroup,
} from '@blueprintjs/core';
import { createWorkOut } from '../../actions/workoutActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import RichEditor from '../Editor/Editor';
import DisplayEditor from '../DisplayEditor/DisplayEditor';
import { EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'react-day-picker/dist/style.css';

const Wrapper = styled.div`
  width: 72%;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  margin-left: 4rem;
`;

const DatePickerWrapper = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s;
`;

const AppToaster = Toaster.create({
  className: 'recipe-toaster',
});
class CreateWorkOut extends Component {
  state = {
    date: null,
    newWorkOutComponent: false,
    createWorkOutError: null,
    activePanel: 'wodPanel',
    title: '',
    editorState: EditorState.createEmpty(),
    rawWorkouts: [],
  };

  handleEditorChange = async (editorState) => {
    await this.setState({
      editorState: editorState,
    });
  };

  toggleInlineStyle = (style) => {
    this.handleEditorChange(
      RichUtils.toggleInlineStyle(this.state.editorState, style)
    );
  };

  toggleBlockStyle = (style) => {
    this.handleEditorChange(
      RichUtils.toggleBlockType(this.state.editorState, style)
    );
  };

  handleAddComponent = async () => {
    const data = JSON.stringify(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    this.state.rawWorkouts.push(data);
    await this.setState({
      rawWorkouts: this.state.rawWorkouts,
    });
    await this.setState({
      editorState: EditorState.createEmpty(),
    });
    await this.toggleNewComponent();
  };

  handleMovementChange = async (value, index = null, name, type) => {
    switch (type) {
      case 'addTitle':
        await this.setState({
          [name]: value,
        });
        break;
      default:
        break;
    }
  };

  toggleNewComponent = async () => {
    await this.setState({
      newWorkOutComponent: !this.state.newWorkOutComponent,
    });
  };

  handleSubmit = async () => {
    const data = {
      workoutComponents: this.state.rawWorkouts,
      date: this.state.date,
      title: this.state.wodTitle,
    };

    let status = await this.props.createWorkOut(data);
    if (!status.success) {
      AppToaster.show({ message: status.message.message });
    } else {
      AppToaster.show({ message: status.message });
    }

    this.setState({
      date: null,
      newWorkOutComponent: false,
      activePanel: 'wodPanel',
      title: '',
      rawWorkouts: [],
      editorState: EditorState.createEmpty(),
    });
  };

  handleClearDate = async () => {
    await this.setState({
      date: null,
    });
  };

  handleSetDate = async (date) => {
    await this.setState({
      date: date,
    });
  };

  handleNextPanel = async (panel) => {
    await this.setState({
      activePanel: panel,
    });
  };

  render() {
    const WhiteboardComponent = (
      <div className="content-top-bottom-button">
        <div>
          <H4>Whiteboard</H4>
          <div>
            <EditableText
              placeholder="Workout Title"
              value={this.state.wodTitle}
              onChange={(e) =>
                this.handleMovementChange(e, null, 'wodTitle', 'addTitle')
              }
              maxLength={65}
            />
          </div>
          <div className="align-left">
            {this.state.rawWorkouts.map((workout) => (
              <DisplayEditor rawContent={JSON.parse(workout)} />
            ))}
          </div>
          <div className="align-left">
            <Button
              className="bp3-minimal"
              icon="plus"
              onClick={this.toggleNewComponent}
            >
              Add Component...
            </Button>
          </div>
        </div>
        <div>
          <Button onClick={() => this.handleNextPanel('datePicker')}>
            Next
          </Button>
        </div>
      </div>
    );

    const DatePickerPanel = (
      <DatePickerWrapper>
        <DayPicker
          mode="single"
          selected={this.state.date}
          onSelect={this.handleSetDate}
        />
        <div>
          <ButtonGroup>
            <Button onClick={() => this.handleNextPanel('wodPanel')}>
              Back
            </Button>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </ButtonGroup>
        </div>
      </DatePickerWrapper>
    );

    return (
      <Wrapper>
        <h1>New Workout</h1>
        <FormGroup>
          <div className="flex-row">
            <Card
              className="margin-right width-half"
              elevation={Elevation.THREE}
            >
              {this.state.activePanel === 'wodPanel'
                ? WhiteboardComponent
                : null}
              {this.state.activePanel === 'datePicker' ? DatePickerPanel : null}
            </Card>
            <Card
              className="custom-bp3-card flex-column width-half min-height-half"
              elevation={Elevation.THREE}
            >
              {this.state.newWorkOutComponent ? (
                <div>
                  <RichEditor
                    editorState={this.state.editorState}
                    toggleBlockStyle={this.toggleBlockStyle}
                    toggleInlineStyle={this.toggleInlineStyle}
                    handleEditorChange={this.handleEditorChange}
                  />
                  <Button intent="primary" onClick={this.handleAddComponent}>
                    Add to Whiteboard
                  </Button>
                </div>
              ) : (
                <>
                  <span>Click + to add a new workout component</span>
                </>
              )}
            </Card>
          </div>
        </FormGroup>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({});

CreateWorkOut.propTypes = {
  createWorkOut: PropTypes.func.isRequired,
};

export default connect(null, { createWorkOut })(CreateWorkOut);
