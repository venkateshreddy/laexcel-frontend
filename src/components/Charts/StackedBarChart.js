import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  { name: 'Mice', black: 4000, white: 2400, brown: 2400 },
  { name: 'Rabbit', black: 3000, white: 1398, brown: 2210 },
  { name: 'Guinea Pig', black: 2000, white: 9800, brown: 2290 },
  { name: 'Chimpanzee', black: 2780, white: 3908, brown: 2000 }
  // { name: 'Page E', black: 1890, white: 4800, brown: 2181 },
  // { name: 'Page F', black: 2390, white: 3800, brown: 2500 },
  // { name: 'Page G', black: 3490, white: 4300, brown: 2100 }
];

const StackedBarChart = props => {
  console.log('in mix bar', props);
  return (
    <BarChart
      width={1200}
      height={250}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="black" stackId="a" fill="#8d9093" barSize={25} />
      <Bar dataKey="white" stackId="a" fill="#edf0f4" barSize={25} />
      <Bar dataKey="brown" stackId="a" fill="#e2cb98" barSize={25} />
    </BarChart>
  );
};

export default StackedBarChart;
