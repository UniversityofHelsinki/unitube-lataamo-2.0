import React from "react";
import './CollectionMoodleCourse.css'
import { ReactComponent as RemoveIcon } from '../../utilities/icons/remove.svg';
import onKeyDown from "../../accessibility/keydown";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

const CollectionMoodleCourse = ({ onRemove, Icon, label, disabled }) => {
    const { t } = useTranslation();
  
    const disabledClass = disabled ? 'collection-moodle-course-disabled' : '';

    return (
        <div className={`collection-moodle-course ${disabledClass}`}>
          <div className="collection-moodle-course-icon">
            <Icon width="30px" height="30px" />
          </div>
          <div className="collection-moodle-course-label">
            {label}
          </div>
          <div className="collection-moodle-course-action">
            <RemoveIcon role="button" tabIndex={0} aria-label={t('remove')} aria-disabled={disabled} onClick={disabled ? () => {} : onRemove} onKeyDown={disabled ? () => {} : onKeyDown(onRemove)} width="30px" height="15px" />
          </div>
        </div>
    );
};

CollectionMoodleCourse.propTypes = {
    label: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    Icon: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
};

export default CollectionMoodleCourse;
