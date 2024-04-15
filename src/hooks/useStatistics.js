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
      console.log("Loading statistics..."); // Add logging
      (async () => {
        const newStatistics = await getStatistics();
        console.log("Newly fetched statistics: ", newStatistics); // Add logging
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
  console.log("Returning statistics: ", statistics); // Add logging
  return [statistics, loading, reload];

};

export default useStatistics;
