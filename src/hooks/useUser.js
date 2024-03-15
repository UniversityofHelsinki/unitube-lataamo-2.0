import { useDispatch, useSelector } from "react-redux";

const login = (url = process.env.REACT_APP_LATAAMO_LOGIN) => {
  window.location.replace(url);
};

const logout = (url = "/Shibboleth.sso/Logout") => {
  window.location.replace(url);
};


const getUser = async () => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/user`;
  console.log(window.location.pathname === '/Shibboleth.sso/Login');
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      login();
    } else {
      throw new Error(`Unexpected status code ${response.status} from ${URL}`);
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error occurred while fetching user from ${URL}`, {
      cause: error
    });
  }
};

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const loadingUser = useSelector((state) => state.users.loadingUser);

  if (!user && !loadingUser) {
    dispatch({ type: 'SET_LOADING_USER', payload: true });
    (async () => {
      dispatch({ type: 'SET_USER', payload: await getUser()});
    })();
  }

  return [user, login, logout];

};

export default useUser;
