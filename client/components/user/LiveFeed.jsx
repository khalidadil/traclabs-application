import React from 'react';

export default React.createClass({
  displayName: 'LiveFeed',

  render() {
    return (
      <div>
        <h2>Live Camera Feed</h2><br />
        <div className="liveFeed">
          {
            <iframe width="100%" height="380" src="https://www.youtube.com/embed/gsIW56ywDhs?rel=0&autoplay=1" frameBorder="0" allowFullScreen></iframe>
          }
        </div>
      </div>
    );
  },
});
