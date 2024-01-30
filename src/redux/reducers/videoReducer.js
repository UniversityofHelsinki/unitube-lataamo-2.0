const videoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_VIDEO':
            return { ...state, video: action.payload };
        default:
            return state;
    }
};

export default videoReducer;
