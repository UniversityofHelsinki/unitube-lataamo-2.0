const selectStatistic = (statistic) => {
    return {
        type: 'STATISTIC_SELECTED',
        payload: statistic
    };
};
export default selectStatistic;
