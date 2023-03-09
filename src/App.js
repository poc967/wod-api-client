import './App.css';
import styled from 'styled-components';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';

// components
import NavigationBar from './components/NavigationBar';
import Main from './components/Main';
import Login from './components/Login';
import CreateWorkOut from './components/CreateWorkOut/CreateWorkOut';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile/Profile';

const AppContainer = styled.div`
  width: 100wv;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const SideNav = styled.div`
  background-color: #383e47;
  max-width: '151px';
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  transition: max-width 1s;
`;

class App extends Component {
  state = {
    minimizeNav: false,
  };

  handleToggleMinimize = () => {
    this.setState({
      minimizeNav: !this.state.minimizeNav,
    });
  };

  render() {
    return (
      <AppContainer className="App">
        {this.props.auth.is_authenticated ? (
          <NavigationBar
            isAuthenticated={this.props.auth.is_authenticated}
            currentUser={this.props.auth.user}
            handleToggleMinimize={this.handleToggleMinimize}
          />
        ) : null}
        <Container>
          <SideNav
            className={this.state.minimizeNav ? 'side-nav-minimized' : ''}
          >
            <div
              style={{
                width: '90%',
                justifyContent: 'space-evenly',
                display: 'flex',
                flexDirection: 'column',
                height: '14rem',
                alignItems: 'flex-start',
              }}
            >
              <Link to="/">
                <Button
                  className="bp3-minimal grey nav-margin"
                  icon="home"
                  minimal={this.state.minimizeNav}
                  text={this.state.minimizeNav ? null : 'Dashboard'}
                />
              </Link>
              <Link to="/workout">
                <Button
                  className="bp3-minimal grey nav-margin"
                  icon="new-prescription"
                  minimal={this.state.minimizeNav}
                  text={this.state.minimizeNav ? null : 'Add Workout'}
                />
              </Link>
              <Link to="/editor">
                <Button
                  className="bp3-minimal grey nav-margin"
                  icon="home"
                  minimal={this.state.minimizeNav}
                  text={this.state.minimizeNav ? null : 'Library'}
                />
              </Link>
              <Button
                className="bp3-minimal grey nav-margin"
                icon="document"
                minimal={this.state.minimizeNav}
                text={this.state.minimizeNav ? null : 'Friend Activity'}
              />
              <Link to="/profile">
                <Button
                  className="bp3-minimal grey nav-margin"
                  icon="settings"
                  minimal={this.state.minimizeNav}
                  text={this.state.minimizeNav ? null : 'Profile'}
                />
              </Link>
            </div>
          </SideNav>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute
                  isAuthenticated={this.props.auth.is_authenticated}
                >
                  <Main />
                </PrivateRoute>
              }
            />
            <Route
              path="/workout"
              element={
                <PrivateRoute
                  isAuthenticated={this.props.auth.is_authenticated}
                >
                  <CreateWorkOut />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute
                  isAuthenticated={this.props.auth.is_authenticated}
                >
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
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
