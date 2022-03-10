import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import NewWorkOutComponentModal from './NewWorkOutComponentModal';

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

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
        <Form>
          <Form.Item label="Title" name="work_out_title">
            <Input size="large" name="work_out_title" />
          </Form.Item>
          <h2>Workout Components</h2>
          <Button onClick={this.toggleComponentModalOpen}>New Component</Button>
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
          />
        </Form>
      </Wrapper>
    );
  }
}

export default CreateWorkOut;
