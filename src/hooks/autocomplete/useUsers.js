import { useSelector, useDispatch } from 'react-redux';

const searchUsers = (searchQuery) => async (dispatch) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/persons/${searchQuery}`;
  try {
    const response = await fetch(encodeURI(URL));
    if (response.status === 200) {
      dispatch({ type: 'SET_USERS', payload: await response.json() });
    }
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
};

const clearUsers = { type: 'CLEAR_USERS' };

const useUsers = () => {
  const users = useSelector((state) => state.autocompletion.users);
  const dispatch = useDispatch();

  return [
    users, 
    (searchQuery) => dispatch(searchUsers(searchQuery)), 
    () => dispatch(clearUsers)
  ];

};

export default useUsers;
