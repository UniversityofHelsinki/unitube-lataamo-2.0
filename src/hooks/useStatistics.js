import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const getStatistics = async () => {
  const URL = `${process.env.REACT_APP_LATAAMO_STREAMS_SERVER}/streams/v1/userStreams`;
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

const useStatistics = (load = false) => {
  const dispatch = useDispatch();
  const statistics = useSelector(
    (state) => {
      return state.statistics.statistics
    }
  );

  useEffect(() => {
    if (load) {
      (async () => {
        const newStatistics = await getStatistics();
        if (newStatistics) {
          dispatch({
            type: 'SET_STATISTICS',
            payload: newStatistics,
          });
        }
      })();
    }
  }, [load, dispatch]);

  const reload = () => {
    dispatch({ type: 'SET_STATISTICS' });
  };

  const loading = !statistics;

  return [statistics, loading, reload];

};

export default useStatistics;
