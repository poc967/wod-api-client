import React from 'react';
import styled from 'styled-components';
import { Modal, Button, Form, Item, Input, Select } from 'antd';
import { FormGroup, Label, InputGroup } from '@blueprintjs/core';

const NewWorkOutComponentModal = (props) => {
  return (
    <Modal
      title="New Component"
      visible={props.componentModalOpen}
      onCancel={props.toggleComponentModalOpen}
    >
      <Form name="basic">
        <Form.Item name="description">
          <Input placeholder="Description" size="large" name="description" />
        </Form.Item>
        <Select
          placeholder="Workout Style"
          size="large"
          style={{ width: '100%', marginBottom: '1.3rem' }}
        >
          <Select.Option value="AMRAP">AMRAP</Select.Option>
          <Select.Option value="For Time">For Time</Select.Option>
          <Select.Option value="EMOM">EMOM</Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
        <Form.Item name="rep_scheme">
          <Input placeholder="Rep Scheme" size="large" name="rep_scheme" />
        </Form.Item>
        <div>
          <h2>Add movements</h2>
          {props.movements.map((movement, index) => (
            <div>{movement.movement}</div>
          ))}
          <Form.Item name="movement">
            <Input
              placeholder="Movement"
              size="large"
              name="movement"
              onChange={props.handleChange}
              value={props.movement}
            />
          </Form.Item>
          <Form.Item name="weight">
            <Input
              placeholder="Weight"
              size="large"
              name="weight"
              onChange={props.handleChange}
              value={props.weight}
            />
          </Form.Item>
          <Form.Item name="repititions">
            <Input
              placeholder="Repititions"
              size="large"
              name="repititions"
              onChange={props.handleChange}
              value={props.repititions}
            />
          </Form.Item>
          <Form.Item name="sets">
            <Input
              placeholder="Sets"
              size="large"
              name="sets"
              onChange={props.handleChange}
              value={props.sets}
            />
          </Form.Item>
          <Form.Item name="notes">
            <Input
              placeholder="Notes"
              size="large"
              name="notes"
              onChange={props.handleChange}
              value={props.notes}
            />
          </Form.Item>
          <Button onClick={props.handleStageMovement}>Add</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default NewWorkOutComponentModal;
