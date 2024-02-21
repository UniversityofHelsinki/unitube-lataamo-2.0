import React from 'react';
import PropTypes from 'prop-types';
import './CollectionBottomBar.css';
import BottomBar from '../right/BottomBar';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import UnsavedChanges from '../right/UnsavedChanges';
import CollectionBottomBarProgress from './CollectionBottomBarProgress';
import { ProgressStatus } from '../../Constants';

const CollectionBottomBar = ({ progress, collection, modified, isValid, undo, disabled }) => {
  const { t } = useTranslation();

  const savingHasBegun = progress.status !== ProgressStatus.COLLECTION_SAVE.NOT_STARTED;
  const savingInProgress = ![
    ProgressStatus.COLLECTION_SAVE.NOT_STARTED,
    ProgressStatus.COLLECTION_SAVE.DONE,
    ProgressStatus.COLLECTION_SAVE.ERROR
  ].includes(progress.status);
  const savingIsDone = savingHasBegun && !savingInProgress;

  const notifications = (() => {
    if (savingIsDone && modified) {
      return <UnsavedChanges />;
    } else if (savingHasBegun || savingIsDone) {
      return <CollectionBottomBarProgress progress={progress} />;
    } else if (modified) {
      return <UnsavedChanges />;
    }

    return <></>;
  })();

  return (
    <BottomBar 
      notifications={notifications}
      buttons={<div className="collection-bottom-bar-buttons">
        <Button onClick={undo} variant="danger" disabled={!modified || disabled}>
          {t('undo_button')}
        </Button>
        <Button type="submit" disabled={!isValid || disabled}>
          {t('save_button')}
        </Button>
      </div>}
    />
  );
};

CollectionBottomBar.propTypes = {
  progress: PropTypes.object,
  collection: PropTypes.object,
  modified: PropTypes.bool,
  disabled: PropTypes.bool,
  isValid: PropTypes.bool,
  undo: PropTypes.func,
};

export default CollectionBottomBar;
