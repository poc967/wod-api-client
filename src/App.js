import './App.css';
import styled from 'styled-components';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// components
import NavigationBar from './components/NavigationBar';
import Main from './components/Main';
import Login from './components/Login';
import CreateWorkOut from './components/CreateWorkOut';
import PrivateRoute from './components/PrivateRoute';

const AppContainer = styled.div`
  width: 100wv;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

class App extends Component {
  render() {
    return (
      <AppContainer className="App">
        <NavigationBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute isAuthenticated={this.props.auth.is_authenticated}>
                <Main />
              </PrivateRoute>
            }
          />
          <Route
            path="/workout"
            element={
              <PrivateRoute isAuthenticated={this.props.auth.is_authenticated}>
                <CreateWorkOut />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AppContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

App.propTypes = {
  auth: PropTypes.object,
};

export default connect(mapStateToProps, null)(App);
