import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 95vw;
  height: 6vh;
  border-radius: 0.5rem;
  border: solid black 2px;
`;

class Button1 extends Component {
  render() {
    return <Wrapper />;
  }
}

export default Button1;
