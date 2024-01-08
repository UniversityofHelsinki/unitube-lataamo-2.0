import React from 'react';
import { IconContext } from 'react-icons';
import { FaUserAlt } from 'react-icons/fa';


import PropTypes from 'prop-types';
const User = () => {
  return (
    <React.Fragment>
      <IconContext.Provider value={{ color: 'grey', className: 'global-class-name' }}>
        <FaUserAlt /> <span>Pekka | </span>
        <a href="/Shibboleth.sso/Logout">logout</a>
      </IconContext.Provider>
    </React.Fragment>
  );
};

User.propTypes = {
};

export default User;
