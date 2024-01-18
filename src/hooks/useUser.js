import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const login = (url = process.env.REACT_APP_LATAAMO_LOGIN) => {
  window.location.replace(url);
};

const logout = (url = "/Shibboleth.sso/Logout") => {
  window.location.replace(url);
};
  

const getUser = () => async (dispatch) => {
  const URL = `${"http://localhost:3001"}/api/user`;
  try {
    const response = await fetch(URL);
    if (response.status === 200) {
      dispatch({ type: 'SET_USER', payload: await response.json() });
    } else if (response.status === 401) {
      login();
    } else {
      dispatch({ type: 'SET_ERROR', payload: await response.status });
    }
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
};

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  return [user, login, logout];

};

export default useUser;
