import { useEffect } from "react";
import { useDispatch } from "react-redux";

const popstate = (dispatch) => {
  return () => {
    const location = window.location.pathname;
    const searchParams = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );
    dispatch({ type: 'SET_LOCATION', payload: location });
    dispatch({ type: 'SET_QUERY_PARAMETERS', payload: searchParams });
  };
};

const useHistory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!window.onpopstate) {
      window.onpopstate = popstate(dispatch);
    }
  }, [dispatch]);


};

export default useHistory;
