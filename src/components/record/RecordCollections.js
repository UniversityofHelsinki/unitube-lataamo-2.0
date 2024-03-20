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

const translateVisibilities = (t, visibilities) => {
  return visibilities.map(visibility => t(visibility)).join(', ');
};

const RecordCollections = ({ collection, onChange, message, disabled = false }) => {
    const id = useId();
    const { t } = useTranslation();
    const [collections, loadingCollections] = useCollectionDropdown(true);

    return (
        <Loading loading={loadingCollections}>
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
                          (collections || []).map((c) => ({
                            value: c.identifier,
                            label: `${/^inbox \w{1,8}$/.test(c.title) ? t('collections_default') : c.title} (${translateVisibilities(t, c.visibility || [])})`,
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
