import React from 'react';

export default React.createClass({
  displayName: 'GasesDetected',

  getInitialState() {
    return {
      methaneAmount: this.generateRandomAmount(),
      neonAmount: this.generateRandomAmount(),
      nitrogenAmount: this.generateRandomAmount(),
    };
  },

  generateRandomPerSecond() {
    setTimeout(() => {
      this.setState({
        methaneAmount: this.generateRandomAmount(),
        neonAmount: this.generateRandomAmount(),
        nitrogenAmount: this.generateRandomAmount(),
      });
    }, 1000);
  },

  generateRandomAmount() {
    let randomGasAmount = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    randomGasAmount = (randomGasAmount < 10 ? `0${randomGasAmount}` : randomGasAmount);
    return randomGasAmount;
  },

  render() {
    this.generateRandomPerSecond();
    return (
      <div className="gasesDetected">
        <p>Gases Detected (ppm)</p>
        <ul>
          <li>
            <div className="gasPPM">{this.state.methaneAmount}</div>
            <div className="gasName">Methane</div>
          </li>
          <li>
            <div className="gasPPM">{this.state.neonAmount}</div>
            <div className="gasName">Neon</div>
          </li>
          <li>
            <div className="gasPPM">{this.state.nitrogenAmount}</div>
            <div className="gasName">Nitrogen</div>
          </li>
        </ul>
      </div>
    );
  },
});
