import useAllRecords from "./useAllRecords";
import useDeletedRecords from "./useDeletedRecords";
import useRecords from "./useRecords";

const useVisibleRecords = ({ showDeleted = false, showAll = false, load = false }) => {
  const [records, loadingRecords, reloadRecords] = useRecords(load && !showAll);
  const [deletedRecords, loadingDeletedRecords, reloadDeletedRecords] = useDeletedRecords(load && showDeleted);
  const [allRecords, loadingAllRecords, reloadAllRecords] = useAllRecords(load && showAll);

  const reload = () => {
    reloadRecords();
    reloadDeletedRecords();
    reloadAllRecords();
  };

  if (showAll && showDeleted) {
    return [[ ...(deletedRecords || []), ...(allRecords || []) ], load && (loadingDeletedRecords || loadingAllRecords), reload];
  } else if (showAll) {
    return [allRecords || [], load && loadingAllRecords, reload];
  } else if (showDeleted) {
    return [[ ...(deletedRecords || []), ...(records || []) ], load && (loadingRecords || loadingDeletedRecords), reload];
  }

  return [records, loadingRecords, reload];
};

export default useVisibleRecords;
