import React from 'react';

export default React.createClass({
  displayName: 'Controls',

  clickArrow(e) {
    Bert.alert(`Clicked on ${e.target.getAttribute('name')}.`, 'success');
  },

  render() {
    return (
      <div>
       <h2>Robot Arm Control</h2><br />
       <div className="arrowBlock">
        <div className="upArrow" name="up arrow" onClick={this.clickArrow}></div>
        <div className="upRightArrow" name="up right arrow" onClick={this.clickArrow}></div>
        <div className="rightArrow" name="right arrow" onClick={this.clickArrow}></div>
        <div className="downRightArrow" name="down right arrow" onClick={this.clickArrow}></div>
        <div className="downArrow" name="down arrow" onClick={this.clickArrow}></div>
        <div className="downLeftArrow" name="down left arrow" onClick={this.clickArrow}></div>
        <div className="leftArrow" name="left arrow" onClick={this.clickArrow}></div>
        <div className="upLeftArrow" name="up left arrow" onClick={this.clickArrow}></div>
       </div>
      </div>
    );
  },
});
