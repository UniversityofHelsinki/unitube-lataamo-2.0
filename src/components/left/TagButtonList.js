import React from 'react';
import PropTypes from 'prop-types';
import './TagButtonList.css';
import TagButton from '../utilities/TagButton';

const TagButtonList = ({ onClick, tags }) => {
  return (
    <ul className="tag-button-list">
      {tags.distinct.map(tag =>
      <li key={tag.label} className="tag-button-list-item">
        <TagButton 
          onClick={onClick} 
          tag={tag} 
          selected={tags.selected.map(st => st.label).includes(tag.label)}
        />
      </li>
      )}
    </ul>
  );
};

TagButtonList.propTypes = {
  onClick: PropTypes.func,
  tags: PropTypes.shape({
    distinct: PropTypes.array,
    selected: PropTypes.array,
  })
};

export default TagButtonList;
