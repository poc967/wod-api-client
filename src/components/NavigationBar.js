import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  width: 100vw;
  height: 9vh;
  background-color: steelblue;
`;
class NavigationBar extends Component {
  render() {
    return (
      <Wrapper>
        <div>
          {this.props.is_authenticated ? (
            <div>
              <Button onClick={this.props.logoutUser}>Logout</Button>
            </div>
          ) : null}
        </div>
      </Wrapper>
    );
  }
}

NavigationBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default connect(null, { logoutUser })(NavigationBar);
