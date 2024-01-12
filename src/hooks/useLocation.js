import { shallowEqual, useDispatch, useSelector } from "react-redux";

const useLocation = () => {
  const path = useSelector(
    (state) => state.location.path
  );
  const searchParameters = useSelector((state) => 
    new URLSearchParams(state.location.searchParameters).toString()
  );
  const dispatch = useDispatch();

  const updateLocation = (path) => {
    window.history.pushState({}, null, `${path}?${searchParameters}`);
    dispatch({ type: 'SET_LOCATION', payload: path });
  };

  return [path, updateLocation];
};

export default useLocation;
