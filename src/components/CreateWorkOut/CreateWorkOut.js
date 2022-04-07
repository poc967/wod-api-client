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
    componentModalOpen: false,
    workoutComponents: [],
    movements: [],
    newWorkOutComponentOpen: false,
    timeCap: null,
    intervalTimeDomain: null,
    rounds: null,
    repScheme: null,
    wodTitle: null,
    newMovement: {
      movement: null,
      weight: null,
      repititions: null,
      sets: null,
      notes: null,
    },
    notes: null,
    workoutStyle: null,
    description: null,
  };

  handleChange = async (e) => {
    let key = e.target.name;
    let value = e.target.value;
    await this.setState({
      [key]: value,
    });
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
    console.log(this.state);
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
                />
              </div>
            </Card>
            <Card className="custom-bp3-card flex-column width-half min-height-half">
              {this.state.newWorkOutComponent ? (
                <>
                  <input
                    className="input-spacing bp3-input"
                    placeholder="Description"
                    size="large"
                    name="description"
                  />
                  <div className="input-spacing bp3-html-select">
                    <select>
                      <option value="">Select...</option>
                      {workOutStyleOptions.map((option, index) => (
                        <option value={option}>{option}</option>
                      ))}
                    </select>
                    <span className="bp3-icon bp3-icon-double-caret-vertical"></span>
                  </div>
                  <input
                    className="input-spacing bp3-input"
                    placeholder="Rep Scheme"
                    size="large"
                    name="repScheme"
                  />
                  <input
                    className="input-spacing bp3-input"
                    placeholder="Time Cap"
                    size="large"
                    name="timeCap"
                  />
                  <input
                    className="input-spacing bp3-input"
                    placeholder="Interval Time Domain"
                    size="large"
                    name="intervalTimeDomain"
                  />
                  <input
                    className="input-spacing bp3-input"
                    placeholder="Notes"
                    size="large"
                    name="notes"
                  />
                  <H4>Movements</H4>
                  <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-striped bp3-html-table-condensed">
                    <thead>
                      <tr>
                        <th>Movement</th>
                        <th>Weight</th>
                        <th>Reps</th>
                        <th>Sets</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Snatch</td>
                        <td>78%</td>
                        <td>10</td>
                        <td>2</td>
                        <td>No misses</td>
                      </tr>
                    </tbody>
                  </table>
                </>
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
