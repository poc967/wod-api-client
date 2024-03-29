import React, { useState } from 'react';
import './styles.css';
import {
  Card,
  Elevation,
  Tabs,
  Tab,
  Icon,
  IconSize,
  FileInput,
  Button,
} from '@blueprintjs/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editUser } from '../../actions/authActions';
import FormData from 'form-data';

const BasicInfo = (props) => (
  <div className="basic-info-layout">
    <span>{props.email}</span>
    <span>Joined Feb 19, 2020</span>
  </div>
);

const BenchmarkLifts = () => (
  <div>
    <Icon icon="build" />
    <h2>Under construction! Check back later.</h2>
  </div>
);

const Profile = (props) => {
  const [activeTab, setActiveTab] = useState('basic');

  const { id, firstName, lastName, email, profilePicture } = props.user;

  function handleTabChange(e) {
    setActiveTab(e);
  }

  function handleSubmitProfilePicture(e) {
    let data = new FormData();
    data.append('image', e.target.files[0]);
    props.editUser(id, data);
  }

  return (
    <div className="layout">
      <Card className="top-box-layout" elevation={Elevation.THREE}>
        <label
          className="profile-image"
          style={{ backgroundImage: `url(${profilePicture})` }}
        >
          <input
            type="file"
            hidden
            onChange={(e) => handleSubmitProfilePicture(e)}
          />
          <div className="transparent-overlay">
            <Icon icon="edit" size="45" />
          </div>
        </label>
        <div className="profile-name">
          <span>{`${firstName} ${lastName}`}</span>
        </div>
        <div className="profile-analytics">
          <div>
            <span className="profile-analytics-number bp3-skeleton">750</span>
            <span className="profile-analytics-tag">Workouts Completed</span>
          </div>
          <div>
            <span className="profile-analytics-number bp3-skeleton">400</span>
            <span className="profile-analytics-tag">Avg. Workouts / Week</span>
          </div>
          <div>
            <span className="profile-analytics-number bp3-skeleton">100</span>
            <span className="profile-analytics-tag">Friends</span>
          </div>
        </div>
      </Card>
      <Card className="bottom-box-layout" elevation={Elevation.THREE}>
        <Tabs
          id="TabsExample"
          selectedTabId={activeTab}
          onChange={(e) => handleTabChange(e)}
        >
          <Tab
            id="basic"
            title="Basic Info"
            panel={<BasicInfo email={email} />}
          />
          <Tab
            id="benchmark"
            title="Benchmark Lifts"
            panel={<BenchmarkLifts />}
          />
          <Tabs.Expander />
        </Tabs>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

Profile.propTypes = {
  user: PropTypes.object,
  editUser: PropTypes.func,
};

export default connect(mapStateToProps, { editUser })(Profile);
