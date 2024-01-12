import { useDispatch, useSelector } from 'react-redux';

const useSearchParams = () => {
  const dispatch = useDispatch();
  const { path, searchParameters } = useSelector((state) => state.location);

  const updateSearchParams = (newSearchParameters) => {
    const searchParametersString = new URLSearchParams(newSearchParameters).toString();
    window.history.pushState(
      {}, 
      null, 
      `${path}?${searchParametersString}`
    );
    dispatch({ 
      type: 'SET_QUERY_PARAMETERS', 
      payload: newSearchParameters
    });
  };
  
  return [searchParameters, updateSearchParams];
};

export default useSearchParams;
