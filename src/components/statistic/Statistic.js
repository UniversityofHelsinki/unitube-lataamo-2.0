import React from 'react';
import {useSelector} from "react-redux";

const Statistic = ({ location, startTimestamp, endBeforeTimestamp }) => {

    const statistic = useSelector(state => state.statistic);

    console.log(statistic);
    return (
        <>
            <div>
                {location}
            </div>
            <div>
                {startTimestamp}
            </div>
            <div>
                {endBeforeTimestamp}
            </div>
        </>
    );
};

export default Statistic;
