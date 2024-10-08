import React from 'react';
import PropTypes from 'prop-types';
import './CollectionCardAction.css';
import HyButton from '../../utilities/HyButton';

const CollectionCardAction = ({ icon, label, variant = 'secondary', onClick, showLabel = true, disabled = false, opensDialog = false, ariaLabel, title = '' }) => {

    const onButtonClick = (event) => {
      event.preventDefault();
      onClick(event);
    };

    const ariaDialog = (() => {
        if (opensDialog) {
            return { 'aria-haspopup': 'dialog' }
        }
        return {};
    })();

    return (
        <HyButton variant={variant} onClick={onButtonClick} aria-label={ariaLabel || label} disabled={disabled} { ...ariaDialog } mini leftIcon={icon} title={title}>
            <span>{showLabel && label}</span>
        </HyButton>
    );
};

CollectionCardAction.propTypes = {
    icon: PropTypes.node,
    label: PropTypes.string,
    onClick: PropTypes.func,
    showLabel: PropTypes.bool,
    disabled: PropTypes.bool,
    opensDialog: PropTypes.bool,
    variant: PropTypes.oneOf([
        'primary', 'secondary', 'danger'
    ])
};

export default CollectionCardAction;
