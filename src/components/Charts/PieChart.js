import React from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';

export default props => (
  <PieChart width={550} height={250}>
    <Pie
      dataKey="value"
      data={props.data}
      cx="50%"
      cy="50%"
      outerRadius={100}
      fill="fill"
    />
    <Tooltip />
    <Legend />
  </PieChart>
);
