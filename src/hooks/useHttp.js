import { useDispatch } from "react-redux";

const useHttp = (url) => {
  const dispatch = useDispatch();

  const get = async (dispatch) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', message: error.message });
    }
  };

  return [() => dispatch(get)];

};

export default useHttp;
