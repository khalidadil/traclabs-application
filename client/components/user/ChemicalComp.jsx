import React from 'react';
import ReactDOM from 'react-dom';
import Highcharts from 'highcharts';

Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: 'Inconsolata',
    },
  },
  plotOptions: {
    series: {
      animation: false,
    },
  },
});

export default React.createClass({
  displayName: 'ChemicalComp',

  getInitialState() {
    return {
      aAmount: this.generateRandomAmount(),
      bAmount: this.generateRandomAmount(),
      cAmount: this.generateRandomAmount(),
      dAmount: this.generateRandomAmount(),
      eAmount: this.generateRandomAmount(),
    };
  },

  componentDidMount() {
    this.createChart();
  },

  componentDidUpdate() {
    this.createChart();
  },

  generateRandomAmount() {
    const randomAmount = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
    return randomAmount;
  },

  generateRandomPerSecond() {
    setTimeout(() => {
      this.setState({
        aAmount: this.generateRandomAmount(),
        bAmount: this.generateRandomAmount(),
        cAmount: this.generateRandomAmount(),
        dAmount: this.generateRandomAmount(),
        eAmount: this.generateRandomAmount(),
      });
    }, 1000);
  },

  createChart() {
    const seriesData = [];
    const data = [
      { name: 'A', amount: this.state.aAmount },
      { name: 'B', amount: this.state.bAmount },
      { name: 'C', amount: this.state.cAmount },
      { name: 'D', amount: this.state.dAmount },
      { name: 'E', amount: this.state.eAmount },
    ];

    Object.keys(data).forEach((i) => {
      seriesData.push(
        { name: data[i].name,
          y: data[i].amount,
        }
      );
    });

    $($(ReactDOM.findDOMNode(this))
      .find('.substrateChart')).highcharts({
        chart: {
          backgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        title: null,
        tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b>',
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          layout: 'vertical',
          itemMarginTop: 5,
          itemMarginBottom: 5,
          y: 20,
          itemStyle: {
            fontWeight: 'normal',
            fontSize: '11px',
          },
          symbolWidth: 11,
          symbolRadius: 7,
        },
        plotOptions: {
          pie: {
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
            point: {
              events: {
                legendItemClick: () => false,
              },
            },
          },
          allowPointSelect: false,
        },
        credits: {
          enabled: false,
        },
        series: [{
          colorByPoint: true,
          data: seriesData,
          dataLabels: {
            style: {
              textShadow: false,
              lineHeight: '14px',
              fontSize: '15px',
              fontWeight: 'normal',
            },
          },
        }],
      });
  },

  render() {
    this.generateRandomPerSecond();
    return (
      <div>
        <p>Substrate Chemical Composition (%)</p>
        <div className="substrateChart"></div>
      </div>
    );
  },
});
