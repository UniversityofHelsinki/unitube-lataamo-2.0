const statisticReducer = (state = null, action) => {
    switch(action.type) {
        case 'STATISTIC_SELECTED':
            return action.payload;
        default:
            return state;
    }
}

export default statisticReducer;
