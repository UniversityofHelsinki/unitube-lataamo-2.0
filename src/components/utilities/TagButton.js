import React from 'react';
import PropTypes from 'prop-types';
import './TagButton.css';
import CardTag from './CardTag';

const TagButton = ({ tag, selected, onClick }) => {

  const unselectedClass = !selected ? 'tag-button-unselected' : '';

  return (
    <button className={`tag-button ${unselectedClass}`} onClick={() => onClick(tag)}>
      <CardTag label={tag.label} color={selected ? tag.color : 'white'} />
    </button>
  );
};

TagButton.propTypes = {
};

export default TagButton;
