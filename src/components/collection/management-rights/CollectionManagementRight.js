import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionManagementRight.css';
import { Col, Container, Row } from 'react-bootstrap';
import { ReactComponent as RemoveIcon } from '../../utilities/icons/remove.svg';
import onKeyDown from '../../accessibility/keydown';

const CollectionManagementRight = ({ onRemove, Icon, label }) => {
  const labelId = useId();
  return (
    <Container className="collection-management-right py-1" tabIndex={0} aria-labelledby={labelId}>
      <Row className="collection-management-right-row justify-content-between align-items-center">
        <Col className="ps-1 pe-0 collection-management-right-label-icon-col">
          <Icon width="30px" height="30px" />
        </Col>
        <Col className="text-center">
          <p className="mb-0 collection-management-right-label" id={labelId}>{label}</p>
        </Col>
        <Col className="text-end px-0 collection-management-right-remove-icon-col">
          <RemoveIcon tabIndex={0} role="button" aria-label="..." tabIndex={0} onClick={onRemove} onKeyDown={onKeyDown(onRemove)} width="30px" height="15px" />
        </Col>
      </Row>
    </Container>
  );
};

CollectionManagementRight.propTypes = {
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default CollectionManagementRight;
