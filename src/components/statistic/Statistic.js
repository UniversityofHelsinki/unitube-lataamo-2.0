import React from 'react';
import {useSelector} from "react-redux";

const Statistic = () => {
    const statistic = useSelector(state => state.statistic);
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
