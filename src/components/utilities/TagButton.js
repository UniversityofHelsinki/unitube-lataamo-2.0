import React from 'react';
import PropTypes from 'prop-types';
import './TagButton.css';
import CardTag from './CardTag';
import { useTranslation } from 'react-i18next';

const TagButton = ({ tag, selected, onClick }) => {
  const { t } = useTranslation();

  const unselectedClass = !selected ? 'tag-button-unselected' : '';

  const ariaLabel = t(`tag_button_${tag.label}_aria`);

  return (
    <button className={`tag-button ${unselectedClass}`} onClick={() => onClick(tag)} aria-label={ariaLabel} title={ariaLabel}>
      <CardTag label={tag.label} color={selected ? tag.color : 'white'} count={tag.count} />
    </button>
  );
};

TagButton.propTypes = {
};

export default TagButton;
