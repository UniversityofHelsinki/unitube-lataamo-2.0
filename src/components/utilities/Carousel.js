import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';
import { useState } from 'react';
import { ReactComponent as PreviousIcon } from './icons/caret-left.svg';
import { ReactComponent as NextIcon } from './icons/caret-right.svg';
import { useTranslation } from 'react-i18next';
import { useId } from 'react';


const CarouselItem = ({ children = [] }) => {
  return <div className="hy-carousel-item">
    {children}
  </div>
};

const Carousel = ({
  children = [],
  labels = []
}) => {
  const { t } = useTranslation();
  const [visibleItem, setVisibleItem] = useState(0);
  const contentId = useId();

  const changeVisibleItem = (event, amount) => {
    event.preventDefault();
    event.stopPropagation();
    setVisibleItem(((visibleItem + children.length) + amount) % children.length);
  };

  return (
    <div className="carousel-container">
      <div id={contentId} className="carousel-item-container" role="tabpanel">
        <CarouselItem>
          {children[visibleItem]}
        </CarouselItem>
      </div>
      {children.length > 1 &&
      <div className="carousel-item-pickers" role="tablist">
        <div className="carousel-item-picker carousel-item-pickers-previous">
          <button onClick={(e) => changeVisibleItem(e, -1)} disabled={visibleItem === 0} role="tab" aria-controls={contentId}>
            <div className="carousel-item-picker-icon">
              <PreviousIcon />
            </div>
            <span>{t('previous')}</span>
          </button>
        </div>
        <div className="carousel-item-label">
          <div className="carousel-item-label-details">
            {labels[visibleItem]}
          </div>
          <div className="carousel-item-label-order">
            {visibleItem+1}/{children.length}
          </div>
        </div>
        <div className="carousel-item-picker carousel-item-pickers-next">
          <button onClick={(e) => changeVisibleItem(e, 1)} disabled={visibleItem + 1 === children.length} role="tab" aria-controls={contentId}>
            <div className="carousel-item-picker-icon">
              <NextIcon />
            </div>
            <span>{t('next')}</span>
          </button>
        </div>
      </div>}
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.node,
  labels: PropTypes.node
};

export default Carousel;
