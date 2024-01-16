import { useSelector, useDispatch } from 'react-redux';

const searchGroups = (searchQuery) => async (dispatch) => {
  const response = [{
    grpName: 'grp-hy-asdf',
    description: 'grp-hy-asdfsadfdfadf jooo hyvä ryhmä on'
  }, {
    grpName: 'grp-hy-ohtu',
    description: 'grp-hy-ohtu-asdfsafsadfd joo hyvä ryhmä on tämäkin'
  }, {
    grpName: 'grp-hy-jeejee',
    description: 'joo jep'
  }]
  const r = response.filter(group => group.grpName.includes(searchQuery));
  dispatch({ type: 'SET_GROUPS', payload: r });
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
