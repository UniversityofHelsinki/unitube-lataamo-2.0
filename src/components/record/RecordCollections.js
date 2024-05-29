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
import { ReactComponent as LinkArrow } from '../utilities/icons/link-arrow.svg';
import useSearchParams from '../../hooks/useSearchParams';
import useUser from '../../hooks/useUser';

const translateVisibilities = (t, visibilities) => {
  return visibilities.map(visibility => t(visibility)).join(', ');
};

const RecordCollections = ({ collection, onChange, message, disabled = false }) => {
    const id = useId();
    const { t } = useTranslation();
    const [collections, loadingCollections] = useCollectionDropdown(true);
    const [_searchParams, setSearchParams] = useSearchParams();
    const [user] = useUser();

    const defaultCollection = collections?.find(collection => collection.title === `inbox ${user.eppn}`);

    const moveToCollection = (event) => {
      event.preventDefault();
      setSearchParams({ collection });
    };

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
                <Col className="record-collections-middle-row">
                  <div>
                    <HelpDialog label={t('record_collections_help_label')}>
                      {t('record_collections_help_content')}
                    </HelpDialog>
                  </div>
                  {collection && collection !== defaultCollection?.identifier &&
                    <a href={`?collection=${collection}`} onClick={moveToCollection} aria-label={t('record_collection_move_aria')} title={t('record_collection_move_aria')}>
                      {t('record_collection_move')}
                    <LinkArrow width="1em" height="1em" aria-hidden />
                  </a>}
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
                        disabled={disabled}
                        required
                      />
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
