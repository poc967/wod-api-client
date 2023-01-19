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
} from '@blueprintjs/core';
import { createWorkOut } from '../../actions/workoutActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Wrapper = styled.div`
  width: 72%;
  // margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  margin-left: 4rem;
`;

const DatePickerWrapper = styled.div`
  width: auto;
  margin-top: 15px;
`;

const AppToaster = Toaster.create({
  className: 'recipe-toaster',
});
class CreateWorkOut extends Component {
  state = {
    workoutComponents: [],
    movements: [],
    wodTitle: null,
    movement: null,
    weight: null,
    repititions: null,
    notes: '',
    date: null,
    description: '',
    newWorkOutComponent: false,
    createWorkOutError: null,
  };

  handleAddComponent = async () => {
    let newComponent = {
      description: this.state.description,
      movements: this.state.movements,
      notes: this.state.notes,
    };
    await this.setState({
      workoutComponents: [...this.state.workoutComponents, newComponent],
      movements: [],
      description: '',
      notes: '',
    });
    await this.toggleNewComponent();
  };

  handleMovementChange = async (value, index = null, name, type) => {
    switch (type) {
      case 'edit_existing_movement':
        let movements = this.state.movements;
        movements[index][name] = value;
        await this.setState({
          movements: movements,
        });
        break;
      case 'add_new_movement':
        await this.setState({
          [name]: value,
        });
        break;
      case 'addDescription':
      case 'addNotes':
        await this.setState({
          [name]: value.target.value,
        });
        break;
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
      workoutComponents: this.state.workoutComponents,
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
      workoutComponents: [],
      movements: [],
      wodTitle: null,
      movement: null,
      weight: null,
      repititions: null,
      notes: '',
      description: '',
      date: null,
      newWorkOutComponent: false,
    });
  };

  handleClearDate = async () => {
    await this.setState({
      date: null,
    });
  };

  render() {
    return (
      <Wrapper>
        <h1>New Workout</h1>
        <FormGroup>
          <div className="flex-row">
            <Card
              className="margin-right width-half"
              elevation={Elevation.THREE}
            >
              <div className="content-top-bottom-button">
                <div>
                  <H4>Whiteboard</H4>
                  <div>
                    <EditableText
                      placeholder="Workout Title"
                      value={this.state.wodTitle}
                      onChange={(e) =>
                        this.handleMovementChange(
                          e,
                          null,
                          'wodTitle',
                          'addTitle'
                        )
                      }
                      maxLength={65}
                    />
                  </div>
                  <DatePickerWrapper>
                    <DatePicker
                      selected={this.state.date}
                      placeholderText="Select date"
                      isClearable={true}
                      onChange={(e) =>
                        this.setState({
                          date: e,
                        })
                      }
                      className="small-text"
                    />
                    {/* <Button
                    className="bp3-minimal"
                    icon="cross"
                    onClick={this.handleClearDate}
                  /> */}
                  </DatePickerWrapper>
                  <div className="align-left">
                    {this.state.workoutComponents.map((component) => (
                      <div className="padding-1-rem">
                        <span className="bolding">{component.description}</span>
                        {component.movements.map((movement) => (
                          <div className="normal-text">
                            {movement.repititions} {movement.movement}
                            {movement.weight ? <>({movement.weight})</> : null}
                          </div>
                        ))}
                      </div>
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
                  <Button onClick={this.handleSubmit}>Submit</Button>
                </div>
              </div>
            </Card>
            <Card
              className="custom-bp3-card flex-column width-half min-height-half"
              elevation={Elevation.THREE}
            >
              {this.state.newWorkOutComponent ? (
                <div>
                  <TextArea
                    className="bp3-fill"
                    growVertically={true}
                    placeholder="Describe workout (Ex. 10 Rounds For Time 20 Minute Cap)"
                    onChange={(e) =>
                      this.handleMovementChange(
                        e,
                        null,
                        'description',
                        'addDescription'
                      )
                    }
                    value={this.state.description}
                  />
                  <H4 className="padding-top">Movements</H4>
                  <table className="bp3-html-table bp3-html-table-condensed table-styles">
                    <thead>
                      <tr>
                        <th>Movement</th>
                        <th>Weight</th>
                        <th>Reps</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.movements.map((movement, index) => (
                        <tr>
                          <td>
                            <EditableText
                              value={movement.movement}
                              onChange={(e) =>
                                this.handleMovementChange(
                                  e,
                                  index,
                                  'movement',
                                  'edit_existing_movement'
                                )
                              }
                            >
                              {movement.movement}
                            </EditableText>
                          </td>
                          <td>
                            <EditableText
                              value={movement.weight}
                              onChange={(e) =>
                                this.handleMovementChange(
                                  e,
                                  index,
                                  'weight',
                                  'edit_existing_movement'
                                )
                              }
                            >
                              {movement.weight}
                            </EditableText>
                          </td>
                          <td>
                            <EditableText
                              value={movement.repititions}
                              onChange={(e) =>
                                this.handleMovementChange(
                                  e,
                                  index,
                                  'repititions',
                                  'edit_existing_movement'
                                )
                              }
                            >
                              {movement.repititions}
                            </EditableText>
                          </td>
                          <td>
                            <EditableText
                              value={movement.notes}
                              onChange={(e) =>
                                this.handleMovementChange(
                                  e,
                                  index,
                                  'notes',
                                  'edit_existing_movement'
                                )
                              }
                            >
                              {movement.notes}
                            </EditableText>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <EditableText
                            onChange={(e) =>
                              this.handleMovementChange(
                                e,
                                null,
                                'movement',
                                'add_new_movement'
                              )
                            }
                            value={this.state.movement}
                            onConfirm={(value) => {
                              let movement = Object.create({});
                              movement.movement = value;
                              this.setState({
                                movements: [...this.state.movements, movement],
                                movement: null,
                              });
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <TextArea
                    className="bp3-fill"
                    growVertically={true}
                    placeholder="Notes..."
                    onChange={(e) =>
                      this.handleMovementChange(e, null, 'notes', 'addNotes')
                    }
                    value={this.state.notes}
                  />
                  <Button
                    className="bp3-minimal"
                    onClick={this.handleAddComponent}
                  >
                    Click To Add Component
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
