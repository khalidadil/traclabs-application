import React from 'react';

export default React.createClass({
  displayName: 'BatteryHealth',

  getInitialState() {
    return {
      batteryHealth: 100,
    };
  },

  reduceBatteryPerSecond() {
    setTimeout(() => {
      if (this.state.batteryHealth > 0) {
        this.setState({
          batteryHealth: this.state.batteryHealth - 1,
        });
      }
    }, 1000);
  },

  returnBatteryColor() {
    if (this.state.batteryHealth >= 80) {
      return 'green';
    } else if (this.state.batteryHealth >= 20) {
      return 'orange';
    }
    return 'red';
  },

  render() {
    this.reduceBatteryPerSecond();
    return (
     <div className="batteryHealth">
        <div className={`batteryPercent ${this.returnBatteryColor()}`}>
          {this.state.batteryHealth}%
        </div>
        Battery Health
     </div>
    );
  },
});
