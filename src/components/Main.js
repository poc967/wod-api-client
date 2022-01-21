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

class Main extends Component {
  render() {
    return (
      <Wrapper>
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
