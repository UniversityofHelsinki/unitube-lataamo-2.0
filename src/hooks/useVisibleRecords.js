import useAllRecords from "./useAllRecords";
import useDeletedRecords from "./useDeletedRecords";
import useRecords from "./useRecords";

const useVisibleRecords = ({ showAll = false, load = false }) => {
  const [records, loadingRecords, reloadRecords] = useRecords(load && !showAll);
  const [allRecords, loadingAllRecords, reloadAllRecords, error] = useAllRecords(load && showAll);
  const [deletedRecords, loadingDeletedRecords, reloadDeletedRecords] = useDeletedRecords(load);

  const reload = () => {
    reloadRecords();
    reloadDeletedRecords();
    reloadAllRecords();
  };

  if (showAll) {
    return [[ ...(deletedRecords || []), ...(allRecords || []) ], load && (loadingDeletedRecords || loadingAllRecords), reload, error];
  }

  return [[ ...(deletedRecords || []), ...(records || []) ], load && (loadingRecords || loadingDeletedRecords), reload, error];

};

export default useVisibleRecords;
