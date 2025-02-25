import { DELETED_SERIES_REG_EXP } from "../Constants";
import useBulkSelect from "./useBulkSelect";
import useUser from "./useUser";

const useBulkRecordSelect = (records) => {
  const [user] = useUser();

  const withoutDeleted = records.filter(
    record => !DELETED_SERIES_REG_EXP(user.eppn).test(record.series)
  );

  const canBeSelected = withoutDeleted.map(record => record.identifier);

  const { 
    selected: selectedRecords, 
    onSelect: onSelectRecord, 
    selectAll, 
    clear,
    toggle: toggleSelectedRecords,
    allSelected: allRecordsSelected
  } = useBulkSelect(withoutDeleted.map(r => r.identifier));

  return { selectedRecords, onSelectRecord, canBeSelected, selectAll, clear, toggleSelectedRecords, allRecordsSelected };
  
};

export default useBulkRecordSelect;
