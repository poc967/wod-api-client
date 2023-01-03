import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Alignment,
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
} from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import PropTypes from 'prop-types';

class NavigationBar extends Component {
  render() {
    const MenuFragment = (
      <Menu>
        <MenuItem
          text="Logout"
          icon="log-out"
          onClick={this.props.logoutUser}
        />
      </Menu>
    );

    const { isAuthenticated, currentUser } = this.props;

    return (
      <Navbar style={{ backgroundColor: 'mediumaquamarine', color: 'bisque' }}>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>WOD Tracker</NavbarHeading>
          <NavbarDivider />
          <Link to="/">
            <Button className="bp3-minimal" icon="home" />
          </Link>
          <Button className="bp3-minimal" icon="document" />
        </NavbarGroup>
        {isAuthenticated ? (
          <NavbarGroup align={Alignment.RIGHT}>
            <Popover content={MenuFragment}>
              <Button className="bp3-minimal" icon="user" />
            </Popover>
            <NavbarDivider />
            <NavbarHeading>Welcome, {currentUser.firstName}!</NavbarHeading>
          </NavbarGroup>
        ) : null}
      </Navbar>
    );
  }
}

NavigationBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default connect(null, { logoutUser })(NavigationBar);
