import React from 'react';
import {useSelector} from "react-redux";
import useAllRoomStatistics from "../../hooks/useAllRoomStatistics";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

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

const Statistic = () => {
    const statistic = useSelector(state => state.statistic);
    const [allRoomStatistics] = useAllRoomStatistics(statistic.start_timestamp, statistic.end_before_timestamp, statistic.room);
    console.log(allRoomStatistics);
    const formatTime = (timestamp) => {
        const dateObject = new Date(timestamp);
        const formattedTime = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // format as HH:mm
        return formattedTime;
    }

    return (
        <>
            <div>
                {statistic.location}
            </div>
            <div>
                {statistic.formattedDate}
            </div>
            <div>
                {statistic.duration}
            </div>
            <div>
                {statistic.maxViewers}
            </div>
            <ResponsiveContainer width='100%' height={300}>
                <LineChart data={allRoomStatistics}>
                    <XAxis dataKey='timestamp' tickFormatter={formatTime} minTickGap={60}/>
                    <YAxis/>
                    <CartesianGrid stroke='#ccc'/>
                    <Line type='monotone' dataKey='totalConnections' stroke='#8884d8'/>
                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default Statistic;
