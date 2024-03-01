import React from "react";
import { DELETED_SERIES_REG_EXP } from "../../Constants";
import useUser from "../useUser";
import { ReactComponent as RestoreIcon } from '../../components/utilities/icons/rotate-left.svg';
import RecordCardAction from "../../components/record/card/RecordCardAction";
import { useTranslation } from "react-i18next";

const useRecordCardActions = (record) => {
  const { t } = useTranslation();
  const [user] = useUser();
  const isDeleted = DELETED_SERIES_REG_EXP(user.eppn).test(record.series);

  const defaultActions = [];

  const iconProps = {
    width: '16px',
    height: '16px'
  };

  const RestoreAction = () => {

    const restore = () => {
      console.log('restore');
    };

    return (
      <RecordCardAction 
        icon={<RestoreIcon { ...iconProps } />}
        label={t('record_card_action_restore')}
        onClick={restore}
      />
    );
  };

  if (isDeleted) {
    return [ ...defaultActions, RestoreAction ];
  }
  
  return [ ...defaultActions ];
};

export default useRecordCardActions;
