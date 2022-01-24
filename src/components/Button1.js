import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.button`
  width: 95vw;
  height: 6vh;
  border-radius: 0.5rem;
  border: solid black 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

class Button1 extends Component {
  render() {
    return (
      <Wrapper>
        <Link>{this.props.text}</Link>
      </Wrapper>
    );
  }
}

export default Button1;
