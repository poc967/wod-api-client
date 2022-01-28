import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';

const Wrapper = styled.div`
  width: 85vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 1rem;
`;

const LoginFormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  padding-bottom: 1rem;
  font-size: 3.5rem;
  font-weight: 200;
`;
class Login extends Component {
  render() {
    return (
      <Wrapper>
        <LoginFormWrapper>
          <Title>Log In</Title>
          <Form name="basic">
            <Form.Item label="Username" name="username">
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input size="large" />
            </Form.Item>
            <Button>Submit</Button>
          </Form>
        </LoginFormWrapper>
      </Wrapper>
    );
  }
}

export default Login;
