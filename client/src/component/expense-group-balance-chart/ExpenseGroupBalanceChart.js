import React from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Label
} from 'recharts'

const ExpenseGroupBalanceChart = (props) => {
  return (
    <div>
      {props.members && props.members.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={props.members}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name">
              {/* <Label
                value="Expense group members balance"
                offset={0}
                position="insideBottom"
              /> */}
            </XAxis>
            <YAxis label={{ value: 'amount', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend verticalAlign="top" height={36}/>
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="balance" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default ExpenseGroupBalanceChart
