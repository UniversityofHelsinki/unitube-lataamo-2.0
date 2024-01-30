import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const getVideo = (record) => async (dispatch) => {
    const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/videoUrl/${record}`;
    try {
        const response = await fetch(URL);
        if (response.status === 200) {
            dispatch({
                type: 'SET_VIDEO',
                payload: await response.json()
            });
        }
    } catch (error) {
        dispatch({ type: '', payload: error.message });
    }
};

const useVideo = (record) => {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.video.video);

    useEffect(() => {
        if (!videos || videos.length === 0) {
            dispatch(getVideo(record));
        }
    }, [dispatch, videos, record]);

    return videos || []; // Ensure that it always returns an array
};

export default useVideo;
