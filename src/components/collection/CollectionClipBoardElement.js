import React from 'react';
import PropTypes from 'prop-types';
import './CollectionClipBoardElement.css';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CopyIcon } from '../utilities/icons/copy.svg';
import {Button} from "react-bootstrap";
import useClipboard from "../../hooks/useClipboard";

const CollectionClipBoardElement = ({ collection }) => {
    const { t } = useTranslation();
    const [copy] = useClipboard();
    const collectionIdentifier = collection?.identifier;

    return (
        <div className="collection-identifier-main-container">
            <div className="collection-identifier-copy-button">
                <Button variant="link" onClick={() => copy(collectionIdentifier)} title={t('collection_identifier_copy')} aria-label={t('collection_identifier_copy')}>
                    <CopyIcon />
                    <span>{t('clipboard_copy')}</span>
                </Button>
            </div>
        </div>
    );
};

CollectionClipBoardElement.propTypes = {
    collection: PropTypes.any
};

export default CollectionClipBoardElement;
