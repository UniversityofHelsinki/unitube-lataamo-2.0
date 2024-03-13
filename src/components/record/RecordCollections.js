import React, {useId} from 'react';
import PropTypes from 'prop-types';
import './RecordCollections.css';
import FormElementHeader from '../form/FormElementHeader';
import { Col, Container, Row } from 'react-bootstrap';
import DropDown from '../form/DropDown';
import { useTranslation } from 'react-i18next';
import Loading from '../utilities/Loading';
import HelpDialog from '../dialog/HelpDialog';
import useCollectionDropdown from '../../hooks/collection/useCollectionDropdown';

const RecordCollections = ({ collection, onChange, message, disabled = false }) => {
    const id = useId();
    const { t } = useTranslation();

    const [collections, loadingCollections, collectionsWithVisibility, loadingCollectionsWithVisibility] = useCollectionDropdown();

    const translateVisibilities = (visibilities) => {
        let translatedVisibilities = "";

        visibilities?.forEach(obj => {
            translatedVisibilities = translatedVisibilities  + `${t(obj)}` + ',';
        });
        return translatedVisibilities.slice(0, -1);
    }

    const addCollectionsVisibility = (collections) => {
        let collectionsCopy = (collections === null  || collections === undefined) ? null : collections.map(a => ({...a}));
        if (collectionsCopy === null || collectionsWithVisibility === undefined) {
            return null;
        }
        collections?.forEach(obj => {
            const index = collectionsWithVisibility?.findIndex(o => o.identifier === obj.identifier);
            if (index !== -1) {
                let elem = collectionsWithVisibility[index];
                let objwithvisibility = {...obj, 'visibility': translateVisibilities(elem.visibility)}
                Object.assign(obj, objwithvisibility);
            } else {
                let objwithvisibility = {...obj, 'visibility': t('status_private')}
                Object.assign(obj, objwithvisibility);
            }
        })
        return collectionsCopy;
    }

    return (
        <Loading loading={loadingCollections && loadingCollectionsWithVisibility}>
          <Container>
              <Row>
                  <Col>
                      <FormElementHeader componentId={id}>
                        {t('record_collection_header')}
                      </FormElementHeader>
                  </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <HelpDialog label={t('record_collections_help_label')}>
                    {t('record_collections_help_content')}
                  </HelpDialog>
                </Col>
              </Row>
              <Row>
                  <Col>
                      <DropDown 
                        id={id}
                        aria-labelledby={id}
                        onChange={(e) => onChange(e.target.value)}
                        options={
                          (addCollectionsVisibility(collections) || []).map((c) => ({
                            value: c.identifier,
                            label: `${c.title} (${c.visibility})`,
                            selected: c.identifier === collection
                          }))
                        } 
                        value={collection}
                        message={message}
                        disabled={disabled} />
                  </Col>
              </Row>
          </Container>
        </Loading>
    );
};

RecordCollections.propTypes = {
    message: PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    }),
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    collection: PropTypes.string.isRequired,
};

export default RecordCollections;
