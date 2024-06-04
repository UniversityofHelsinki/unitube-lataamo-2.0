import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as DeleteIcon } from '../../components/utilities/icons/trash.svg';
import './DeleteCollection.css';
import CollectionCardAction from './card/CollectionCardAction';
import { useTranslation } from 'react-i18next';
import FormDialog from '../dialog/FormDialog';
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import ElementHeader from '../form/ElementHeader';
import HelpDialog from '../dialog/HelpDialog';
import { ProgressStatus } from '../../Constants';

import useCollections from '../../hooks/useCollections';
import useCollection from '../../hooks/useCollection';
import useCollectionDelete from '../../hooks/collection/useCollectionDelete';
import useSearchParams from "../../hooks/useSearchParams";
import DeleteCollectionFooter from "./DeleteCollectionFooter";

const DeleteCollection = ({ collection, showLabel = true, reloadCollectionOnRemove = false, buttonDisabled = false }) => {
    const { t } = useTranslation();
    const [showForm, setShowForm] = useState(false);
    const [deleteCollection, progress, resetProgress] = useCollectionDelete();
    const [_collections, _loadingCollections, reloadCollections] = useCollections();
    const [visibleCollection, _loadingCollection, reloadCollection] = useCollection();
    const [_searchParams, setSearchParams] = useSearchParams();

    const hide = () => {
        setShowForm(false);
        resetProgress();
        if (progress.status === ProgressStatus.COLLECTION_DELETE.DONE) {
            reloadCollections();
            if (visibleCollection?.identifier === collection.identifier) {
                setSearchParams({});
            }
        };
    };
    const show = () => {
        setShowForm(true);
    };

    const button = (
        <CollectionCardAction
            icon={<DeleteIcon />}
            label={t('collection_card_action_delete')}
            ariaLabel={t('collection_card_action_delete_aria', { title: collection.title})}
            onClick={show}
            showLabel={showLabel}
            variant={showLabel ? 'danger' : 'link'}
            disabled={buttonDisabled}
            opensDialog={true}
        />
    );

    const onSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        await deleteCollection(collection);
    };


    const closeable = progress.status !== ProgressStatus.COLLECTION_DELETE.IN_PROGRESS;

    return (
        <FormDialog
            showComponent={button}
            show={showForm}
            hide={hide}
            closeable={closeable}>
            <Modal.Header closeButton={closeable}>
                {t('collection_delete_form_header')}
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <ElementHeader label={t('delete_collection_form_body_header')}>
                                    {t('delete_collection_form_body_header')}
                                </ElementHeader>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <HelpDialog label={t('delete_collection_form_help_header')}>
                                    {t('delete_collection_form_help_content')}
                                </HelpDialog>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span className="blockquote">{collection.title}</span>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <DeleteCollectionFooter progress={progress} hide={hide} />
                </Modal.Footer>
            </Form>
        </FormDialog>
    );
};

DeleteCollection.propTypes = {
    collection: PropTypes.object,
    showLabel: PropTypes.bool,
    reloadCollectionOnRemove: PropTypes.bool,
    buttonDisabled: PropTypes.bool
};

export default DeleteCollection;
