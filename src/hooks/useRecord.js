import { useState } from "react";
import { useEffect } from "react";
import useSearchParams from "./useSearchParams";

const getRecordEndDate = async (record) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/event/${record}/deletionDate`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
  }
};

const getRecord = async (record) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/event/${record}`
  try {
    const response = await fetch(URL);
    const deletionDate = await getRecordEndDate(record);
    if (response.ok) {
      return {
        ...await response.json(),
        deletionDate: deletionDate.deletionDate
      };
    }
  } catch (error) {
    console.error(error);
  }
};

const useRecord = () => {
  const [searchParams] = useSearchParams();
  const [record, setRecord] = useState(null); 

  const thereIsRecord = record?.identifier;
  const recordHasChanged 
    = thereIsRecord && record.identifier !== searchParams.record;

  useEffect(() => {
    if (!thereIsRecord || recordHasChanged) {
      (async () => {
        setRecord(await getRecord(searchParams.record));
      })();
    }
  }, [record, searchParams.record]);

  const loading = !thereIsRecord || recordHasChanged;
  const reload = () => setRecord(null);
  return [record, loading, reload];
};

export default useRecord;
