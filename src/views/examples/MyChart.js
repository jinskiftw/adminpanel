import React from 'react';
import { Chart } from 'react-google-charts';

const MyChart = () => {
  const data = [
    ['Age', 'Weight'], // Header row for column labels
    [4, 5.5],
    [8, 12],
  ];

  const options = {
    title: 'Age vs. Weight',
    hAxis: { title: 'Age' },
    vAxis: { title: 'Weight' },
    legend: { position: 'bottom' }, // Optional: Set legend position
  };

  return (
    <Chart
      chartType="ScatterChart"
      data={data}
      width="100%"
      height="400px"
      options={options}
    />
  );
};

export default MyChart;