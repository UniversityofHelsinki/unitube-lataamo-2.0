import React, {useEffect, useId} from 'react';
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

const RecordCollections = ({ collection, onChange, message, disabled = false, showLink = true }) => {
    const id = useId();
    const { t } = useTranslation();
    const [collections, loadingCollections] = useCollectionDropdown(true);
    const [_searchParams, setSearchParams] = useSearchParams();
    const [user] = useUser();

    const inbox = collections?.find(collection => collection.title === `inbox ${user.eppn}`);

    useEffect(() => {
      if (!collection && inbox) {
        onChange(inbox.identifier)
      }
    }, [collection]);

    const goToCollection = (event) => {
      event.preventDefault();
      setSearchParams({ collection });
    };

    const options = (collections || []).map((c) => ({
      value: c.identifier,
      label: `${/^inbox \w{1,8}$/.test(c.title) ? t('collections_default') : c.title} (${translateVisibilities(t, c.visibility || [])})`,
      selected: c.identifier === collection
    }));

    return (
        <Loading loading={loadingCollections}>
          <Container>
              <Row>
                  <Col className="record-collections-col">
                      <FormElementHeader 
                        id={id}
                        helpDialog={(
                          <HelpDialog label={t('record_collections_help_label')}>
                            {t('record_collections_help_content')}
                          </HelpDialog>
                        )}
                      >
                        {t('record_collection_header')}
                      </FormElementHeader>
                  </Col>
              </Row>
              <Row>
                <Col>
                    <div className="record-collections-move-to-collection">
                      {collection && collection !== inbox?.identifier && showLink &&
                      <a href={`?collection=${collection}`} onClick={goToCollection} aria-label={t('record_collection_move_aria')} title={t('record_collection_move_aria')}>
                        {t('record_collection_move')}
                        <span className="mx-1"></span>
                        <LinkArrow width="1em" height="1em" aria-hidden />
                      </a>}
                    </div>
                </Col>
              </Row>
              <Row>
                  <Col>
                      <DropDown 
                        aria-labelledby={id}
                        onChange={(e) => onChange(e.target.value)}
                        options={options} 
                        value={collection}
                        message={message}
                        disabled={disabled}
                        aria-required
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
    collection: PropTypes.string,
    defaultCollection: PropTypes.string,
};

export default RecordCollections;
