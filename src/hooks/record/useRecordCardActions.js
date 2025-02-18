import React from "react";
import { DELETED_SERIES_REG_EXP } from "../../Constants";
import useUser from "../useUser";
import RestoreRecord from "../../components/record/RestoreRecord";
import DeleteRecord from "../../components/record/DeleteRecord";

const useRecordActions = (record, disabled = false) => {
  const [user] = useUser();
  const isDeleted = DELETED_SERIES_REG_EXP(user.eppn).test(record.series);

  const defaultActions = [];

  const restoreAction = <RestoreRecord record={record} buttonDisabled={disabled} />

  const deleteAction = <DeleteRecord record={record} buttonDisabled={disabled} />;

  if (isDeleted) {
    return [ ...defaultActions, restoreAction ];
  }
  
  return [ ...defaultActions, deleteAction ];
};

export default useRecordActions;
