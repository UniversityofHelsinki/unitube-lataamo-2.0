import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";

const getVideos = (record) => async (dispatch) => {
    const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/videoUrl/${record}`;
    try {
        const response = await fetch(URL);
        if (response.status === 200) {
            dispatch({
                type: 'SET_VIDEOS',
                payload: await response.json()
            });
        }
    } catch (error) {
        dispatch({ type: '', payload: error.message });
    }
};

const useVideos = (record) => {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.video.videos);
    const prevRecordRef = useRef();

    useEffect(() => {
        if (record) {
            if (prevRecordRef.current !== record) {
                dispatch(getVideos(record));
            }
            // Update the ref with the current record for the next render
            prevRecordRef.current = record;
        }
    }, [record, dispatch]);
    return videos || []; // Ensure that it always returns an array
};

export default useVideos;
