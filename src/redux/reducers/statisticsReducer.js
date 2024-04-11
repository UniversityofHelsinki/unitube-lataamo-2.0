const statisticsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STATISTICS':
            return { ...state, statistics: action.payload };
        default:
            return state;
    };
};

export default statisticsReducer;
