import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import { verifyAuthDataForLogin } from '../helpers/loginHelpers';
import { authenticateUser } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

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
  state = {
    username: null,
    password: null,
  };

  onSubmit = async (e) => {
    e.preventDefault();

    // verify both username and password are entered
    let { username, password, error } = verifyAuthDataForLogin(
      this.state.username,
      this.state.password
    );

    if (error) {
      throw new Error('Missing username or password');
    } else {
      this.props.authenticateUser(username, password);
    }
  };

  handleChange = async (e) => {
    e.preventDefault();

    await this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    if (this.props.auth.is_authenticated) return <Navigate to="/" />;
    return (
      <Wrapper>
        <LoginFormWrapper>
          <Title>Log In</Title>
          <Form name="basic">
            <Form.Item label="Username" name="username">
              <Input
                size="large"
                name="username"
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input
                size="large"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </Form.Item>
            <Button onClick={this.onSubmit}>Submit</Button>
          </Form>
        </LoginFormWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Login.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

export default connect(mapStateToProps, { authenticateUser })(Login);
