import React, { Component } from 'react';
import styled from 'styled-components';

// components
import Button1 from './Button1';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding-top: 1rem;
  width: 95%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 1.125rem;
`;

const WorkoutBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 95vw;
  margin: 0 auto;
  border: solid black 2px;
  border-radius: 0.5rem;
  margin-top: 15px;
`;

let mockWorkOutData = {
  title: 'test title',
  date: null,
  work_outs: [
    {
      id: '62f7196b980d371bb834fc81',
      description: 'AMRAP 10',
      is_deleted: false,
      movements: [
        {
          movement: {
            id: '62f7131f441f080786bcf621',
            name: 'wall balls',
            is_deleted: false,
            created: 'Fri Aug 12 22:57:34 2022',
          },
          repititions: '20',
          sets: null,
          weight: '20/14',
          notes: null,
        },
      ],
      notes: 'unbroken',
      created: 'Fri Aug 12 23:24:25 2022',
    },
  ],
};
class Main extends Component {
  render() {
    return (
      <Wrapper>
        <Title>Aug 18, 2022</Title>
        {mockWorkOutData.work_outs.map((work_out) => (
          <WorkoutBox>
            {work_out.description}
            <ul style={{ listStyleType: 'none' }}>
              {work_out.movements.map((movement) => (
                <li>{`${movement.repititions} ${movement.movement.name} (${movement.weight})`}</li>
              ))}
            </ul>
          </WorkoutBox>
        ))}
        <ButtonContainer>
          <Button1 text="New Workout" />
          <Button1 text="Whiteboard" />
          <Button1 text="Feed" />
        </ButtonContainer>
      </Wrapper>
    );
  }
}

export default Main;
