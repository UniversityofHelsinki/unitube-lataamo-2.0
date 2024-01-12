import React from 'react';
import { ReactComponent as Avatar } from './../utilities/icons/avatar.svg';
import './User.css';

import PropTypes from 'prop-types';
const User = () => {
  return (
    <React.Fragment>
        <Avatar className='avatar'/>
        <span value={{ color: 'grey', className: 'global-class-name' }}>
            <span>Pekka | </span>
            <a href="/Shibboleth.sso/Logout">logout</a>
        </span>
    </React.Fragment>
  );
};

User.propTypes = {
};

export default User;
