import React from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts';
import CustomStatisticTable from "./StatisticTable";

const formatTime = (timestamp) => {
    const dateObject = new Date(timestamp);
    const formattedTime = dateObject.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return formattedTime;
};

const CustomTooltip = ({ active, payload }) => {
    if(active && payload && payload.length) {
        const date = new Date(payload[0].payload.timestamp);
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
            <div className='custom-tooltip'>
                <p>{`Time: ${formattedTime}`}</p>
                <p>{`Total Connections: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const CustomLineChart = ({ processedStatistics }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={processedStatistics}>
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={formatTime}
                    minTickGap={60}
                />
                <YAxis />
                <CartesianGrid stroke="#ccc" />
                <Line
                    type="monotone"
                    dataKey="totalConnections"
                    stroke="#8884d8"
                />
                <Tooltip content={<CustomTooltip />} />
            </LineChart>
        </ResponsiveContainer>
    );
};

CustomLineChart.defaultProps = {
    processedStatistics: []
};

export default CustomLineChart;
