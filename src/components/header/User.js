import React from 'react';
import { ReactComponent as Avatar } from './../utilities/icons/avatar.svg';
import PropTypes from 'prop-types';
import './User.css';

const User = () => {
  return (
    <>
      <Avatar height="20px" width="20px" />
      <span>
          <span>Pekka | </span>
      </span>
    <a href="/Shibboleth.sso/Logout">logout</a>
    </>
  );
};

User.propTypes = {
};

export default User;
