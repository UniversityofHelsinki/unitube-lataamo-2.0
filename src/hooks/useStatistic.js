const selectStatistic = (statistic) => {
    return {
        type: 'STATISTIC_SELECTED',
        payload: statistic
    };
};

const getStatistics = async (start_timestamp, end_before_timestamp, room) => {
    const URL = `http://localhost:3011/streams/v1/allViews/${start_timestamp}/${end_before_timestamp}/${room}`;
    try {
        const response = await fetch(URL);
        if (response.status === 200) {
            return await response.json();
        }
        throw new Error(`Unexpected status code ${response.status} from ${URL}`);
    } catch (error) {
        console.error(error);
    }
};

export default selectStatistic;
