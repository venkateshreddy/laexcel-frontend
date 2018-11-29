import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer
} from 'recharts';

const BarChartComponent = props => (
  <div className="barChart-Container">
    <ResponsiveContainer width={750} height={250}>
      <BarChart
        // width={600}
        // height={800}
        data={props.data}
        // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="quantity" fill="fill" width={100} barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default BarChartComponent;
