import { useSelector, useDispatch } from 'react-redux';

const searchUsers = (searchQuery) => async (dispatch) => {
  const response = [{
    firstName: "Raimo",
    lastName: "Keskivääntö",
    userName: "rkeskiva",
    email: "raimo.keskivaanto@helsinki.fi"
  }, {
    firstName: "Baabe",
    lastName: "Nomypeevo",
    userName: "baabenom",
    email: "baabe.nomypeevo@helsinki.fi"
  }]
  const r = response.filter(user => user.userName.includes(searchQuery));
  dispatch({ type: 'SET_USERS', payload: r });
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
