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
import HelpDialog from '../../dialog/HelpDialog';
import ElementHeader from '../../form/ElementHeader';

const CollectionManagementRights = ({ users = [], groups = [], onUserChange, onGroupChange, disabled }) => {
  const { t } = useTranslation();

  const selectUser = (user) => {
    if (!users.includes(user.userName)) {
      const newSelectedUsers = [ ...users, user.userName ];
      if (onUserChange) {
        onUserChange(newSelectedUsers);
      }
    }
  };

  const selectGroup = (group) => {
    if (!groups.includes(group.grpName)) {
      const newSelectedGroups = [ ...groups, group.grpName ];
      if (onGroupChange) {
        onGroupChange(newSelectedGroups);
      }
    }
  };

  const removeUser = (user) => {
    const userRemovedUsers = users.filter(u => u !== user);
    if (onUserChange) {
      onUserChange(userRemovedUsers);
    }
  };

  const removeGroup = (group) => {
    const groupRemovedGroups = groups.filter(g => g !== group);
    if (onGroupChange) {
      onGroupChange(groupRemovedGroups);
    }
  };

  return (
    <Container className="collection-management-rights ps-0">
      <Row>
        <Col>
          <ElementHeader label={(t('collection_management_rights_form_header'))}>
            {t('collection_management_rights_form_header')}
          </ElementHeader>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <HelpDialog label={t('collection_management_rights_help_label')}>
            {t('collection_management_rights_help_content')}
          </HelpDialog>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <UserAutoComplete onSelect={selectUser} disabled={disabled} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className="collection-management-rights-list">
            {users.map((user) =>
              <li key={user}>
                <CollectionManagementRight label={user} onRemove={() => removeUser(user)} Icon={UserIcon} disabled={disabled} />
              </li>)}
          </ul>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <GroupAutoComplete onSelect={selectGroup} disabled={disabled} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className="collection-management-rights-list collection-management-rights-groups-list">
            {groups.map((group) => 
              <li key={group}>
                <CollectionManagementRight label={group} onRemove={() => removeGroup(group)} Icon={GroupIcon} disabled={disabled} />
              </li>)}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

CollectionManagementRights.propTypes = {
  users: PropTypes.array,
  groups: PropTypes.array,
  onUserChange: PropTypes.func,
  onGroupChange: PropTypes.func
};

export default CollectionManagementRights;
