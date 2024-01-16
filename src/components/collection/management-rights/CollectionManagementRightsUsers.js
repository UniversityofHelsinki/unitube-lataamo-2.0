import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CollectionManagementRightsUsers.css';
import { Container, Row } from 'react-bootstrap';

const CollectionManagementRightsUsers = ({ users, onRemove, onSelect }) => {
  const [selectedUsers, setSelectedUsers] = useState(users);
  return (
    <Container>
      <Row>
        <AutoComplete options={selectedUsers} />
      </Row>
      <Row>
      </Row>
    </Container>
  );
};

CollectionManagementRightsUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string),
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CollectionManagementRightsUsers;
