import React from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts';
import {useTranslation} from "react-i18next";
import './CustomLineChart.css'

const formatTime = (timestamp) => {
    const dateObject = new Date(timestamp);
    const formattedTime = dateObject.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return formattedTime;
};

const CustomTooltip = ({ active, payload }) => {
    const { t } = useTranslation();
    if(active && payload && payload.length) {
        const date = new Date(payload[0].payload.timestamp);
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
            <div className='custom-tooltip'>
                <p>{t('timestamp')}{`: ${formattedTime}`}</p>
                <p>{t('total_connections')} {`: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

// This function will process ticks
const getProcessedTicks = (minData, maxData) => {
    const ticks = new Set();
    for (let i = Math.ceil(minData); i <= Math.floor(maxData); i++) {
        ticks.add(i);
    }
    return [...ticks];
};

const CustomLineChart = ({ processedStatistics }) => {
    const yAxisData = processedStatistics.map((item) => item.totalConnections);
    const minData = Math.min(...yAxisData);
    const maxData = Math.max(...yAxisData);
    const ticks = getProcessedTicks(minData, maxData);
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={processedStatistics}>
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={formatTime}
                    minTickGap={60}
                />
                <YAxis dataKey="totalConnections" ticks={ticks} />
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
