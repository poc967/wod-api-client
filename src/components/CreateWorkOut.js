import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import { FormGroup } from '@blueprintjs/core';
import NewWorkOutComponentModal from './NewWorkOutComponentModal';

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const workOutStyleOptions = ['AMRAP', 'For Time', 'EMOM', 'Other'];

class CreateWorkOut extends Component {
  state = {
    componentModalOpen: false,
    workoutComponents: [],
    movements: [],
    wodTitle: null,
    movement: null,
    weight: null,
    repititions: null,
    sets: null,
    notes: null,
  };

  handleChange = async (e) => {
    let key = e.target.name;
    let value = e.target.value;
    await this.setState({
      [key]: value,
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
          <input
            className="bp3-input bp3-large bp3-fill"
            type="text"
            name="work_out_title"
            placeholder="Workout Title"
          />
          <h2>Workout Components</h2>
          <input
            className="bp3-input bp3-large bp3-fill"
            placeholder="Description"
            type="text"
            name="description"
          />
          <div class="bp3-html-select bp3-fill bp3-large">
            <select>
              <option value="">Select...</option>
              {workOutStyleOptions.map((option, index) => (
                <option value={option}>{option}</option>
              ))}
            </select>
            <span class="bp3-icon bp3-icon-double-caret-vertical"></span>
          </div>
          <input
            className="bp3-input bp3-fill bp3-large"
            placeholder="Rep Scheme"
            size="large"
            name="rep_scheme"
          />
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
