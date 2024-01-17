import React from 'react';
import PropTypes from 'prop-types';
import ListElement from './ListElement';
import './ListContainer.css';

const ListContainer = ({ children = [] }) => {
  return (
    <ul className="no-padding list-container">
      {children.map((element, i) => 
        <li key={i} className="list-element" tabIndex={0}>
          <ListElement>
            {element}
          </ListElement>
        </li>
      )}
    </ul>
  );
};

ListContainer.propTypes = {
  children: PropTypes.array,
};

export default ListContainer;
