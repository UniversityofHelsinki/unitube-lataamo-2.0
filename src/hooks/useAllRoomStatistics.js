import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

const getAllRoomStatistics = async (start_timestamp, end_before_timestamp, room) => {
    const URL = `${process.env.REACT_APP_LATAAMO_STREAMS_SERVER}/streams/v1/allViews/${start_timestamp}/${end_before_timestamp}/${room}`;
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

const useAllRoomStatistics = (start_timestamp, end_before_timestamp, room) => {
    const dispatch = useDispatch();
    const allRoomStatistics = useSelector(
        (state) => {
            return state.statistics.allRoomStatistics
        }
    );

    useEffect(() => {
            (async () => {
                const allRoomStatistics = await getAllRoomStatistics(start_timestamp, end_before_timestamp, room);
                if (allRoomStatistics) {
                    dispatch({
                        type: 'SET_ALL_ROOM_STATISTICS',
                        payload: allRoomStatistics,
                    });
                }
            })();
    }, [dispatch]);

    const reload = () => {
        dispatch({ type: 'SET_ALL_ROOM_STATISTICS' });
    };

    const loading = !allRoomStatistics;

    return [allRoomStatistics, loading, reload];

};

export default useAllRoomStatistics;
