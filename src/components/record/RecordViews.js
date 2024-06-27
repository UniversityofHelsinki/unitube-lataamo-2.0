import {useTranslation} from "react-i18next";
import React from "react";
import ElementHeader from "../form/ElementHeader";
import PropTypes from "prop-types";

const RecordViews = ({views}) => {
    const { t } = useTranslation();
    return (
        <>
            <ElementHeader>
                {t('record_views_header')}
            </ElementHeader>
            <span className="blockquote">{views}</span>
        </>
    );
};

RecordViews.propTypes = {
    views: PropTypes.string.isRequired
}

export default RecordViews;
