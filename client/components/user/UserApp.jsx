import React from 'react';
import Header from '/client/components/shared/Header.jsx';
import Controls from '/client/components/user/Controls.jsx';
import LiveFeed from '/client/components/user/LiveFeed.jsx';
import BatteryHealth from '/client/components/user/BatteryHealth.jsx';
import GasesDetected from '/client/components/user/GasesDetected.jsx';
import ChemicalComposition from '/client/components/user/ChemicalComp.jsx';

export default React.createClass({
  displayName: 'UserApp',

  render() {
    return (
      <div className="app">
        <Header />
        <h1 className="title">Robotics Control Platform</h1>
        <div className="robotControls">
          <Controls />
          <LiveFeed />
        </div>
        <div className="robotStats">
          <h2>Realtime Data</h2><br />
          <div className="leftSide">
            <BatteryHealth />
            <GasesDetected />
          </div>
          <div className="rightSide">
            <ChemicalComposition />
          </div>
        </div>
      </div>
    );
  },
});
