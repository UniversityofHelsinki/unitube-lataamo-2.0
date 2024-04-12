import React from 'react';
import {useSelector} from "react-redux";
import useAllRoomStatistics from "../../hooks/useAllRoomStatistics";

const Statistic = () => {
    const statistic = useSelector(state => state.statistic);
    const [allRoomStatistics] = useAllRoomStatistics(statistic.start_timestamp, statistic.end_before_timestamp, statistic.room);
    console.log(allRoomStatistics);
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
        </>
    );
};

export default Statistic;
