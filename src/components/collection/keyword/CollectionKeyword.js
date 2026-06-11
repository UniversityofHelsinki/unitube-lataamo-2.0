import React from 'react';
import PropTypes from 'prop-types';
import './CollectionKeyword.css';
import { ReactComponent as RemoveIcon } from '../../utilities/icons/remove.svg';
import onKeyDown from '../../accessibility/keydown';
import { useTranslation } from 'react-i18next';

const CollectionKeyword = ({ onRemove, label, disabled }) => {
    const { t } = useTranslation();

    const disabledClass = disabled ? 'collection-keyword-disabled' : '';

    return (
        <div className={`collection-keyword ${disabledClass}`}>
          <div className="collection-keyword-label">
            {label}
          </div>
          <div className="collection-keyword-action">
            <RemoveIcon role="button" tabIndex={0} aria-label={`${t('collection_keyword_remove')} ${label}`} aria-disabled={disabled} onClick={disabled ? () => {} : onRemove} onKeyDown={disabled ? () => {} : onKeyDown(onRemove)} width="30px" height="15px" />
          </div>
        </div>
    );
};

CollectionKeyword.propTypes = {
    label: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default CollectionKeyword;
