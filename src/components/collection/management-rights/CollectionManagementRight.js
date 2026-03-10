import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionManagementRight.css';
import { ReactComponent as RemoveIcon } from '../../utilities/icons/remove.svg';
import onKeyDown from '../../accessibility/keydown';
import { useTranslation } from 'react-i18next';

const CollectionManagementRight = ({ onRemove, Icon, label, disabled }) => {
  const { t } = useTranslation();

  const disabledClass = disabled ? 'collection-management-right-disabled' : '';

  return (
    <div className={`collection-management-right ${disabledClass}`}>
      <div className="collection-management-right-icon">
        <Icon aria-hidden="true" width="30px" height="30px" />
      </div>
      <div className="collection-management-right-label">
        {label}
      </div>
      <div className="collection-management-right-action">
        <RemoveIcon tabIndex={0} role="button" aria-label={`${t('collection_management_right_remove')} ${label}`} aria-disabled={disabled} onClick={disabled ? () => {} : onRemove} onKeyDown={disabled ? () => {} : onKeyDown(onRemove)} width="30px" height="15px" />
      </div>
    </div>
  );
};

CollectionManagementRight.propTypes = {
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  Icon: PropTypes.any.isRequired,
  disabled: PropTypes.bool
};

export default CollectionManagementRight;
