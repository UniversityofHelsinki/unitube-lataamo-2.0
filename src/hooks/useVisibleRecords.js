import useAllRecords from "./useAllRecords";
import useDeletedRecords from "./useDeletedRecords";
import useRecords from "./useRecords";

const useVisibleRecords = ({ showAll = false, load = false }) => {
  const [records, loadingRecords, reloadRecords, error_inbox] = useRecords(load && !showAll);
  const [allRecords, loadingAllRecords, reloadAllRecords, error_allrecords] = useAllRecords(load && showAll);
  const [deletedRecords, loadingDeletedRecords, reloadDeletedRecords, error_trash] = useDeletedRecords(load);

  const reload = () => {
    reloadRecords();
    reloadDeletedRecords();
    reloadAllRecords();
  };

  if (showAll) {
    return [[ ...(deletedRecords || []), ...(allRecords || []) ], load && (loadingDeletedRecords || loadingAllRecords), reload, error_allrecords, error_inbox, error_trash];
  }

  return [[ ...(deletedRecords || []), ...(records || []) ], load && (loadingRecords || loadingDeletedRecords), reload, error_allrecords, error_inbox, error_trash];

};

export default useVisibleRecords;
