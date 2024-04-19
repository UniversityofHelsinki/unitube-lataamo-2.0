const statisticsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STATISTICS':
            return { ...state, statistics: action.payload };
        case 'SET_ALL_ROOM_STATISTICS':
            return { ...state, allRoomStatistics: action.payload }
        default:
            return state;
    };
};

export default statisticsReducer;
