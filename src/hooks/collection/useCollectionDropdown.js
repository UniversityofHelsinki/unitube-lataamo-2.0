import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

const useCollectionDropdown = (load = false) => {
  const dispatch = useDispatch();
  const collectionDropDown = useSelector((state) => 
    state.collections.collectionDropDown
  );

  useEffect(() => {
    if (load && !collectionDropDown) {
      (async () => {
        dispatch({ 
          type: 'SET_COLLECTION_DROPDOWN', 
          payload: await get() 
        });
      })();
    }
  }, [collectionDropDown, load, dispatch]);

  const loading = !collectionDropDown;
  return [collectionDropDown, loading];
};

export default useCollectionDropdown;
