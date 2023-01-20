import React from 'react';
import './styles.css';
import { Card, Elevation, Tabs, Tab } from '@blueprintjs/core';

const Profile = (props) => {
  return (
    <div className="layout">
      <Card className="top-box-layout" elevation={Elevation.THREE}>
        <div className="profile-image"></div>
        <div className="profile-name"></div>
        <div className="profile-analytics"></div>
      </Card>
      <Card className="bottom-box-layout" elevation={Elevation.THREE}>
        <Tabs id="TabsExample" selectedTabId="rx">
          <Tab id="ng" title="Basic Info" panel={<span>Basic Info</span>} />
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
