import React, { useId } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import { ReactComponent as CopyIcon } from '../utilities/icons/copy.svg';
import { Button } from 'react-bootstrap';
import useClipboard from '../../hooks/useClipboard';
import ElementHeader from './ElementHeader';
import './ClipBoardFormElement.css';
import { useNotification } from '../notification/NotificationContext';

const ClipBoardFormElement = ({ label, content, children, buttonAriaLabel }) => {
    const { t } = useTranslation();
    const [copy] = useClipboard();
    const { setNotification } = useNotification();
    const labelId = useId();

    const handleClick = () => {
      copy(content);
      setNotification(t('clipboard_copied_to_clipboard'), 'success', true);
    };

    return (
      <div className="clipboard-form-element">
        <div className="clipboard-form-element-header">
          <ElementHeader
            helpDialog={(
              <Button variant="link" aria-label={buttonAriaLabel} onClick={handleClick} title={buttonAriaLabel}>
                <CopyIcon width="1em" height="1em" />
                <span id={labelId}>{t('clipboard_copy')}</span>
              </Button>
            )}
          >{label}</ElementHeader>
        </div>
        <div className="clipboard-form-element-content">
          {children}
        </div>
      </div>
    );
};

ClipBoardFormElement.propTypes = {
    label: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    children: PropTypes.object,
    buttonAriaLabel: PropTypes.string.isRequired
};

export default ClipBoardFormElement;
