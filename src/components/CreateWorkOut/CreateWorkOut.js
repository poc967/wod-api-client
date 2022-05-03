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
} from '@blueprintjs/core';
import NewWorkOutComponentModal from '../NewWorkOutComponentModal';

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const workOutStyleOptions = ['AMRAP', 'For Time', 'EMOM', 'Other'];

class CreateWorkOut extends Component {
  state = {
    workoutComponents: [],
    movements: [
      {
        movement: 'Snatch',
        weight: '95#/55#',
        repititions: '3',
        notes: 'none',
      },
      {
        movement: 'Wall Ball',
        weight: '20#/16#',
        repititions: null,
        notes: null,
      },
    ],
    timeCap: null,
    intervalTimeDomain: null,
    rounds: null,
    wodTitle: null,
    newMovement: {
      movement: null,
      weight: null,
      repititions: null,
      sets: null,
      notes: null,
    },
    movement: null,
    notes: null,
    workoutStyle: null,
  };

  handleMovementChange = async (value, index, name) => {
    let movements = this.state.movements;
    movements[index][name] = value;
    await this.setState({
      movements: movements,
    });
  };

  handleConfirm = async (e, type) => {
    console.log(e, type);
  };

  toggleNewComponent = async () => {
    await this.setState({
      newWorkOutComponent: true,
    });
  };

  handleStageMovement = async () => {
    const { movement, weight, repititions, sets, notes } = this.state;
    let newWorkoutMovement = {
      movement,
      weight,
      repititions,
      sets,
      notes,
    };
    await this.setState({
      movements: [...this.state.movements, newWorkoutMovement],
      movement: null,
      weight: null,
      repititions: null,
      sets: null,
      notes: null,
    });
  };

  toggleComponentModalOpen = () => {
    this.setState({
      componentModalOpen: !this.state.componentModalOpen,
    });
  };

  render() {
    return (
      <Wrapper>
        <h1>New Workout</h1>
        <FormGroup>
          <div className="flex-row">
            <Card className="margin-right width-half">
              <H4>Whiteboard</H4>
              <div>
                <EditableText placeholder="Workout Title" maxLength={65} />
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
            </Card>
            <Card className="custom-bp3-card flex-column width-half min-height-half">
              {this.state.newWorkOutComponent ? (
                <div>
                  <TextArea
                    className="bp3-fill"
                    growVertically={true}
                    placeholder="Describe workout (Ex. 10 Rounds For Time 20 Minute Cap)"
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
                                this.handleMovementChange(e, index, 'movement')
                              }
                            >
                              {movement.movement}
                            </EditableText>
                          </td>
                          <td>
                            <EditableText
                              value={movement.weight}
                              onChange={(e) =>
                                this.handleMovementChange(e, index, 'weight')
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
                                  'repititions'
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
                                this.handleMovementChange(e, index, 'notes')
                              }
                            >
                              {movement.notes}
                            </EditableText>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <input
                            type="text"
                            class="bp3-input"
                            placeholder="Select movement"
                            onChange={(e) => this.handleChange(e, 'movement')}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  <span>Click + to add a new workout component</span>
                </>
              )}
            </Card>
          </div>
          {/* <Button onClick={this.toggleComponentModalOpen}>New Component</Button>
          <NewWorkOutComponentModal
            componentModalOpen={this.state.componentModalOpen}
            toggleComponentModalOpen={this.toggleComponentModalOpen}
            handleChange={this.handleChange}
            handleStageMovement={this.handleStageMovement}
            movements={this.state.movements}
            movement={this.state.movement}
            weight={this.state.weight}
            repititions={this.state.repititions}
            sets={this.state.sets}
            notes={this.state.notes}
          /> */}
        </FormGroup>
      </Wrapper>
    );
  }
}

export default CreateWorkOut;
