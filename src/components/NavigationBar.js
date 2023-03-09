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
  Icon,
} from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import PropTypes from 'prop-types';

class NavigationBar extends Component {
  render() {
    const MenuFragment = (
      <Menu>
        <MenuItem text="Settings" icon="cog" />
        <MenuItem
          text="Logout"
          icon="log-out"
          onClick={this.props.logoutUser}
        />
      </Menu>
    );

    const { isAuthenticated, currentUser } = this.props;

    return (
      <Navbar style={{ backgroundColor: '#383E47', color: '#D3D8DE' }}>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>WOD Tracker</NavbarHeading>
          <NavbarDivider style={{ backgroundColor: 'white' }} />
          <Button
            icon="menu"
            onClick={() => this.props.handleToggleMinimize()}
            style={{ color: '#383e47', marginLeft: '5px' }}
            minimal={true}
          />
        </NavbarGroup>
        {isAuthenticated ? (
          <NavbarGroup align={Alignment.RIGHT}>
            <Popover content={MenuFragment}>
              <Button className="bp3-minimal" icon="user" />
            </Popover>
            <NavbarDivider style={{ backgroundColor: 'white' }} />
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
