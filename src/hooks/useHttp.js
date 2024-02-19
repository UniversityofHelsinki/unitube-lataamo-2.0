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
      throw new Error('http error in GET', {
        cause: error
      });
    }
  };

  return [() => dispatch(get)];

};

export default useHttp;
