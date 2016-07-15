import React from 'react';

export default React.createClass({
  displayName: 'Header',

  render() {
    return (
      <div className="header">
        <div className="leftContainer">
          <img src="/assets/images/traclabs_logo@2x.png" className="logo" />
        </div>
      </div>
    );
  },
});