import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import './CollectionCreators.css'
import UserAutoComplete from '../../form/autocomplete/user/UserAutoComplete';
import ElementHeader from '../../form/ElementHeader';
import HelpDialog from '../../dialog/HelpDialog';
import { useTranslation } from 'react-i18next';
import { ReactComponent as UserIcon } from '../../utilities/icons/avatar.svg';
import CollectionManagementRight from '../management-rights/CollectionManagementRight';

const creatorEquals = (a, b) => {
  const aFullName = a.displayName;
  const bFullName = `${b.firstName} ${b.lastName}`;
  return a.userName === b.userName && aFullName === bFullName;
};

const CollectionCreators = ({ creators = [], onChange, disabled }) => {
  const { t } = useTranslation();

  const selectCreators = (creator) => {
    if (!creators.some(c => creatorEquals(c, creator))) {
      const newSelectedCreator = [{ displayName: `${creator.firstName} ${creator.lastName}`, userName: creator.userName }];
      if (onChange) {
        onChange(newSelectedCreator);
      }
    }
  };

  const removeCreator = (creator) => {
    const restOfTheCreators = creators.filter(c => !creatorEquals(c, creator));
    if (onChange) {
      onChange(restOfTheCreators);
    }
  };

  return (
    <Container className="collection-creators ps-0">
      <Row>
        <Col>
          <ElementHeader
            label={(t('collection_management_creator_form_header'))}
            helpDialog={(
              <HelpDialog label={t('collection_management_creator_help_label')}>
                {t('collection_management_creator_help_content')}
              </HelpDialog>
            )}>
            {t('collection_management_creator_form_header')}
          </ElementHeader>
        </Col>
      </Row>
      <Row>
        <Col>
          <UserAutoComplete onSelect={selectCreators} disabled={disabled} />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <ul className="collection-management-rights-list">
            {creators.map((creator) =>
              <li key={creator}>
                <CollectionManagementRight label={`${creator.displayName} (${creator.userName})`} onRemove={() => removeCreator(creator)} Icon={UserIcon} disabled={disabled} />
              </li>)}
          </ul>
        </Col>
      </Row>
    </Container>
  );

};

CollectionCreators.propTypes = {
  creators: PropTypes.array,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CollectionCreators;