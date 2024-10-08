import React from 'react';
import PropTypes from 'prop-types';
import './CardTags.css';
import CardTag from './CardTag';

const CardTags = ({ tags }) => {
  return (
    <ul className="card-tags">
      {tags.map((tag) => (
        <li key={tag.label}>
          <CardTag { ...tag } />
        </li>
      ))}
    </ul>
  );
};

CardTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    color: PropTypes.string
  }))
};

export default CardTags;
