import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CollectionManagementRights.css';
import { Col, Container, Row } from 'react-bootstrap';
import UserAutoComplete from '../../form/autocomplete/user/UserAutoComplete';
import { useTranslation } from 'react-i18next';
import CollectionManagementRight from './CollectionManagementRight';
import { ReactComponent as UserIcon } from '../../utilities/icons/avatar.svg';
import { ReactComponent as GroupIcon } from '../../utilities/icons/avatar-group.svg';
import GroupAutoComplete from '../../form/autocomplete/group/GroupAutoComplete';
import FormElementHeader from '../../form/FormElementHeader';

const CollectionManagementRights = ({ users = [], groups = [] }) => {
  const [selectedUsers, setSelectedUsers] = useState(users);
  const [selectedGroups, setSelectedGroups] = useState(groups);
  const { t } = useTranslation();

  const selectUser = (user) => {
    if (!selectedUsers.map(u => u.userName).includes(user.userName)) {
      setSelectedUsers([ ...selectedUsers, user ]);
    }
  };

  const selectGroup = (group) => {
    if (!selectedGroups.map(g => g.grpName).includes(group.grpName)) {
      setSelectedGroups([ ...selectedGroups, group ]);
    }
  };

  const removeUser = (user) => {
    setSelectedUsers(selectedUsers.filter(u => u.userName !== user.userName));
  };

  const removeGroup = (group) => {
    setSelectedGroups(selectedGroups.filter(g => g.grpName !== group.grpName));
  };

  return (
    <Container className="collection-management-rights">
      <Row>
        <FormElementHeader label={t('collection_management_rights_form_header')} />
      </Row>
      <Row className="mb-2">
        <Col>
          <span>Mikä ihmeen hallinnointioikeus?</span>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <UserAutoComplete onSelect={selectUser} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className="collection-management-rights-list">
            {selectedUsers.map((user) =>
              <li key={user.userName}>
                <CollectionManagementRight label={user.userName} onRemove={() => removeUser(user)} Icon={UserIcon} />
              </li>)}
          </ul>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <GroupAutoComplete onSelect={selectGroup} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className="collection-management-rights-list collection-management-rights-groups-list">
            {selectedGroups.map((group) => 
              <li key={group.grpName}>
                <CollectionManagementRight label={group.grpName} onRemove={() => removeGroup(group)} Icon={GroupIcon} />
              </li>)}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

CollectionManagementRights.propTypes = {
  users: PropTypes.array,
  groups: PropTypes.array
};

export default CollectionManagementRights;
