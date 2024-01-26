import React from 'react';
import { ReactComponent as Avatar } from './../utilities/icons/avatar.svg';
import PropTypes from 'prop-types';
import './User.css';
import useUser from '../../hooks/useUser';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const User = () => {
  const { t } = useTranslation();
  const [user, _, logout] = useUser();
  return (
    <Container>
      <Row>
        <Col>
          <Avatar height="1em" width="1em" />
          <span className="me-2">{user.displayName} ({user.eppn})</span>
          <Button className="pt-0" variant="link" onClick={() => logout()}>{t('log_out')}</Button>
        </Col>
      </Row>
    </Container>
  );
};

User.propTypes = {
};

export default User;
