import React from 'react';
import PropTypes from 'prop-types';
import './CollectionBottomBar.css';
import BottomBar from '../right/BottomBar';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import UnsavedChanges from '../right/UnsavedChanges';
import CollectionBottomBarProgress from './CollectionBottomBarProgress';

const CollectionBottomBar = ({ progress, collection, modified, isValid, undo, disabled }) => {
  const { t } = useTranslation();

  const notifications = (() => {
    if (progress.status !== 'NOT_STARTED') {
      return <CollectionBottomBarProgress progress={progress} />;
    }

    if (modified) {
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
        <Button type="submit" disabled={!modified || disabled}>
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
  isValid: PropTypes.bool,
  undo: PropTypes.func,
};

export default CollectionBottomBar;
