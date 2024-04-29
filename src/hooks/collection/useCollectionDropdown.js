import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCollectionSort from '../../hooks/collection/useCollectionSort';
import useUser from "../useUser";

const get = async () => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/userSeriesWithOutTrash`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Unexpected status code of ${response.status} while fetching collection for dropdown lists from ${URL}`);
  } catch (error) {
    console.log(error);
    throw new Error(`Error while fetching collections for drop down lists from ${URL}`, { 
      cause: error 
    });
  }
};

let alreadyLoading = false;
const useCollectionDropdown = (load = false) => {
  const [user] = useUser();
  const criteria = 'title';
  const descending = false;
  const dispatch = useDispatch();
  const collectionDropDown = useSelector((state) => 
    state.collections.collectionDropDown
  );
  const [sortedCollection, _collectionSortCriterias] = useCollectionSort(
      collectionDropDown,
      criteria,
      descending
  );

  useEffect(() => {
    if (load && !collectionDropDown && !alreadyLoading) {
      alreadyLoading = true;
      (async () => {
        dispatch({ 
          type: 'SET_COLLECTION_DROPDOWN', 
          payload: await get() 
        });
        alreadyLoading = false;
      })();
    }
  }, [collectionDropDown, load, dispatch]);

  const loading = !collectionDropDown;
  let title = `inbox ${user.eppn}`;
  let sortedCollectionDropDown = sortedCollection?.sort((x,y) => { return x.title == title ? -1 : y.title == title ? 1 : 0; });

  return [sortedCollectionDropDown, loading];
};

export default useCollectionDropdown;
