import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import ProgressBar from '../../../form/ProgressBar';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useId } from 'react';

const Footer = ({ 
  progress, 
  onCancel, 
  onSave,
  progressBarProps,
  submittable
}) => {
  const { t } = useTranslation();
  const btnListId = useId();

  const buttons = {
    not_started: [
      <Button variant="outline-secondary" onClick={onCancel}>
        {t('cancel')}
      </Button>,
      <Button variant="danger" onClick={onSave} disabled={!submittable}>
        {t('confirm')}
      </Button>
    ],
    in_progress: [
      <Button variant="outline-secondary" onClick={onCancel} disabled>
        {t('cancel')}
      </Button>,
      <Button variant="danger" onClick={onSave} disabled>
        {t('confirm')}
      </Button>
    ],
    done: [
      <Button variant="outline-secondary" onClick={onCancel}>
        {t('close')}
      </Button>
    ],
    error: [
      <Button variant="outline-secondary" onClick={onCancel}>
        {t('close')}
      </Button>
    ],
  }[progress];

  const label = progressBarProps.label;
  const type = progressBarProps.type;
  const animated = progressBarProps.animated;

  const showProgressBar = progress !== 'not_started';

  return (
    <div className="bulk-actions-dialog-footer">
      <div className="bulk-actions-dialog-footer-progress-bar">
        {showProgressBar && <ProgressBar type={type} now={100} label={t(label)} alertMessage={<></>} animated={animated} />}
      </div>
      <div className="mx-1"></div>
      <div className="bulk-actions-dialog-footer-buttons">
        {buttons.map((btn, i, btns) => (
          <React.Fragment key={`${btnListId}-${i}`}>
            {btn}
            {i+1 < btns.length && <div className="mx-1"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

Footer.propTypes = {
  progress: PropTypes.string
};

export default Footer;