import React, { Component } from 'react';
import styled from 'styled-components';
import { verifyAuthDataForLogin } from '../helpers/loginHelpers';
import { authenticateUser } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100vh;
  margin: 0 auto;
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
        <h2 className="bp3-heading">Login</h2>
        <FormGroup
          labelFor="text-input"
          className="login-form-flex"
          labelInfo="(required)"
        >
          <InputGroup
            id="text-input"
            placeholder="Username"
            className="input-spacing"
            onChange={this.handleChange}
            name="username"
          />
          <InputGroup
            id="text-input"
            placeholder="Password"
            className="input-spacing"
            onChange={this.handleChange}
            type="password"
            name="password"
          />
          <Button onClick={this.onSubmit}>Submit</Button>
        </FormGroup>
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
