import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionManagementRight.css';
import { Col, Container, Row } from 'react-bootstrap';
import { ReactComponent as RemoveIcon } from '../../utilities/icons/remove.svg';
import onKeyDown from '../../accessibility/keydown';
import { useTranslation } from 'react-i18next';

const CollectionManagementRight = ({ onRemove, Icon, label, disabled }) => {
  const labelId = useId();
  const { t } = useTranslation();

  const disabledClass = disabled ? 'collection-management-right-disabled' : '';

  return (
    <Container className={`collection-management-right py-1 ${disabledClass}`} tabIndex={0} aria-labelledby={labelId}>
      <Row className="collection-management-right-row justify-content-between align-items-center">
        <Col className="ps-1 pe-0 collection-management-right-label-icon-col">
          <Icon width="30px" height="30px" />
        </Col>
        <Col className="text-center">
          <p className="mb-0 collection-management-right-label" id={labelId}>{label}</p>
        </Col>
        <Col className="text-end px-0 collection-management-right-remove-icon-col">
          <RemoveIcon tabIndex={0} role="button" aria-label={`${t('collection_management_right_remove')} ${label}`} aria-disabled={disabled} onClick={disabled ? () => {} : onRemove} onKeyDown={disabled ? () => {} : onKeyDown(onRemove)} width="30px" height="15px" />
        </Col>
      </Row>
    </Container>
  );
};

CollectionManagementRight.propTypes = {
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  Icon: PropTypes.any.isRequired,
  disabled: PropTypes.bool
};

export default CollectionManagementRight;
