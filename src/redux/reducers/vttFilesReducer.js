
const vttFilesReducer = (state = { loadingRecords: false }, action) => {
    switch (action.type) {
        case 'GET_VTTFILES':
            return { ...state, vttfilesdata: action.payload };
        case 'SET_CONVERSION':
            return { ...state, conversion: action.payload };
        default:
            return state;
    };
}

export default vttFilesReducer;
