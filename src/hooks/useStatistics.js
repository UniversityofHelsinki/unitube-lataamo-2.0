import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const getStatistics = async () => {
  const URL = `${process.env.REACT_APP_LATAAMO_STREAMS_SERVER}/streams/v1/userStreams`;
  console.log(URL);
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
    console.log(load);
    console.log(statistics);
    if (load && !statistics) {
      (async () => {
        dispatch({
          type: 'SET_STATISTICS',
          payload: await getStatistics()
        });
      })();
    }
  }, [load, statistics]);

  const reload = () => {
    dispatch({ type: 'SET_STATISTICS' });
  };

  const loading = !statistics;

  return [statistics, loading, reload];

};

export default useStatistics;
