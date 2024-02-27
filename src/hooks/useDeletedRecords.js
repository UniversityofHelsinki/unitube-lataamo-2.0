import { useState } from "react";

const get = async () => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/userTrashEvents`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`unexpected status code from ${URL}`);
  } catch (error) {
    console.error(error);
    throw new Error(`Error while GETting deleted records from ${URL}`);
  }
};

const useDeletedRecords = ({ load = false }) => {
  const [deletedRecords, setDeletedRecords] = useState(null);

  if (!deletedRecords) {
    (async () => {
      setDeletedRecords(await get());
    })();
  }

  return [deletedRecords, Boolean(!deletedRecords)];

};

export default useDeletedRecords;
