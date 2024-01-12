import { useDispatch, useSelector } from "react-redux";

const useLocation = () => {
  const { path, searchParameters } = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const updateLocation = (path) => {
    const searchParametersString = new URLSearchParams(searchParameters).toString();
    window.history.pushState({}, null, `${path}?${searchParametersString}`);
    dispatch({ type: 'SET_LOCATION', payload: path });
  };

  return [path, updateLocation];
};

export default useLocation;
