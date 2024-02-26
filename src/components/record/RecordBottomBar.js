import React from 'react';
import PropTypes from 'prop-types';
import './RecordBottomBar.css';
import BottomBar from '../right/BottomBar';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import UnsavedChanges from '../right/UnsavedChanges';
import RecordBottomBarProgress from './RecordBottomBarProgress';
import { ProgressStatus } from '../../Constants';

const UndoButton = ({ onClick, disabled }) => {
  const { t } = useTranslation();
  const disabledProps = disabled ? { disabled: true } : {};
  return (
    <Button variant="danger" onClick={onClick} { ...disabledProps }>{t('undo_button')}</Button>
  );
};

const SaveButton = ({ disabled }) => {
  const { t } = useTranslation();
  const disabledProps = disabled ? { disabled: true } : {};
  return (
    <Button type="submit" variant="primary" { ...disabledProps }>{t('save_button')}</Button>
  );
};

const RecordBottomBar = ({ progress, record, modified, undo, isValid }) => {

  const savingHasBegun = progress.status !== ProgressStatus.RECORD_SAVE.NOT_STARTED;
  const savingInProgress = savingHasBegun && progress.status !== ProgressStatus.RECORD_SAVE.DONE && progress.status !== ProgressStatus.RECORD_SAVE.ERROR;
  const savingIsDone = savingHasBegun && !savingInProgress;

  const notification = (() => {
    if (savingIsDone && modified) {
      return <UnsavedChanges />;
    } else if (savingIsDone || savingHasBegun) {
      return <RecordBottomBarProgress progress={progress} />
    } else if (modified) {
      return <UnsavedChanges />;
    }

    return <></>;
  })();

  return (
    <BottomBar 
      notifications={notification}
      buttons={(
        <div className="record-bottom-bar-buttons">
          <UndoButton onClick={undo} disabled={!modified || savingInProgress}/>
          <SaveButton disabled={!modified || !isValid || savingInProgress} />
        </div>
      )} />
  );
};

RecordBottomBar.propTypes = {
  progress: PropTypes.any,
  record: PropTypes.any,
  modified: PropTypes.bool,
  undo: PropTypes.func,
  save: PropTypes.func,
  isValid: PropTypes.bool
};

export default RecordBottomBar;
