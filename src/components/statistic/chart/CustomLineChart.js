import React from 'react';
import {ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Label} from 'recharts';
import {useTranslation} from "react-i18next";
import './CustomLineChart.css'


/**
 * Formats a given timestamp and returns a formatted time string in the format "hh:mm".
 *
 * @param {number} timestamp - The timestamp in milliseconds.
 * @returns {string} The formatted time string.
 */
const formatTime = (timestamp) => {
    const dateObject = new Date(timestamp);
    const formattedTime = dateObject.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return formattedTime;
};


/**
 * CustomTooltip component displays a custom tooltip with timestamp and total connections information.
 * @param {Object} props - The props object
 * @param {boolean} props.active - Indicates if the tooltip is active or not
 * @param {Array} props.payload - The data payload for the tooltip
 * @returns {JSX.Element|null} The rendered custom tooltip
 */
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

/**
 * CustomLineChart is a custom line chart component that takes in processedStatistics as input and renders a line chart.
 *
 * @param {object} processedStatistics - An array of objects containing data for the line chart.
 * @returns {JSX.Element} - The line chart component.
 */
const CustomLineChart = ({ processedStatistics }) => {
    const { t } = useTranslation();
    const yAxisData = processedStatistics.map((item) => item.totalConnections);
    const maxData = Math.max(...yAxisData);
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={processedStatistics}>
                <XAxis
                    dataKey="timestamp"
                    height={50}
                    tickFormatter={formatTime}
                    minTickGap={60}>
                    <Label value={(t('timestamp'))} position="insideBottom" />
                </XAxis>
                <YAxis type="number" allowDataOverflow={true} dataKey="totalConnections" scale="linear" domain={[0, maxData]} >
                    <Label value={t('total_connections')} angle={-90} style={{ textAnchor: 'middle' }}  position="insideLeft" />
                </YAxis>
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
