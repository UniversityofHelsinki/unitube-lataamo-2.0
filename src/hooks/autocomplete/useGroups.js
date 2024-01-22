import { useSelector, useDispatch } from 'react-redux';

const searchGroups = (searchQuery) => async (dispatch) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/iamGroups/${searchQuery}`;
  try {
    const response = await fetch(encodeURI(URL));
    if (response.status === 200) {
      dispatch({ type: 'SET_GROUPS', payload: await response.json() });
    }
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
};

const clearGroups = { type: 'CLEAR_GROUPS' };

const useGroups = () => {
  const groups = useSelector((state) => state.autocompletion.groups);
  const dispatch = useDispatch();

  return [
    groups, 
    (searchQuery) => dispatch(searchGroups(searchQuery)), 
    () => dispatch(clearGroups)
  ];

};

export default useGroups;
