import React from 'react';
import './styles.css';
import { Card, Elevation, Tabs, Tab, EditableText } from '@blueprintjs/core';

const BasicInfo = (props) => (
  <div className="basic-info-layout">
    {/* <EditableText
      value="pat_test@gmail.com"
      className="basic-info-layout-text-field"
    /> */}
    <span>pat_test@gmail.com</span>
    <span>Joined Feb 19, 2020</span>
  </div>
);

const Profile = (props) => {
  return (
    <div className="layout">
      <Card className="top-box-layout" elevation={Elevation.THREE}>
        <div className="profile-image"></div>
        <div className="profile-name">
          <span>Patrick Test-User</span>
        </div>
        <div className="profile-analytics">
          <div>
            <span className="profile-analytics-number">75</span>
            <span className="profile-analytics-tag">Workouts Completed</span>
          </div>
          <div>
            <span className="profile-analytics-number">4</span>
            <span className="profile-analytics-tag">Avg. Workouts / Week</span>
          </div>
          <div>
            <span className="profile-analytics-number">10</span>
            <span className="profile-analytics-tag">Friends</span>
          </div>
        </div>
      </Card>
      <Card className="bottom-box-layout" elevation={Elevation.THREE}>
        <Tabs id="TabsExample" selectedTabId="basic">
          <Tab id="basic" title="Basic Info" panel={<BasicInfo />} />
          <Tab
            id="mb"
            title="Benchmark Lifts"
            panel={<span></span>}
            panelClassName="ember-panel"
          />
          <Tabs.Expander />
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;
