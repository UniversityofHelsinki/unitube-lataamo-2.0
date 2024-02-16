import React from 'react';
import PropTypes from "prop-types";
import { ReactComponent as DownloadIcon } from '../utilities/icons/download.svg';
import { ReactComponent as RemoveIcon } from '../utilities/icons/remove.svg';
import './RecordSubtitleDownloadLinks.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FormElementHeader from '../form/FormElementHeader';

const DownloadLink = ({ to, label }) => {
    return (
        <>
            <DownloadIcon width="2em" height="2em" />
            <a className="ms-2" href={to}>{label}</a>
        </>
    );
};

const DeleteSubtitle = () => {
    return (
        <RemoveIcon width="1.5em" height="2em" />
    );
};


const RecordSubtitleDownloadLinks = ({ subtitles }) => {
    const { t } = useTranslation();
    return (
        <Container>
            <Row>
                <Col>
                    <FormElementHeader>
                        {t('record_subtitle_download_links_header')}
                    </FormElementHeader>
                </Col>
            </Row>
            <Row className="mb-3">
            </Row>
            <Row>
                <Col>
                    <ul className="blockquote record-subtitle-download-link-list">
                        {subtitles.map((subtitle, i) => (
                            <li key={subtitle.id || i}>
                                <DeleteSubtitle />
                                <DownloadLink to={`${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/` + subtitle.url} label={subtitle.filename} />
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

RecordSubtitleDownloadLinks.propTypes = {
    subtitles: PropTypes.array,
};

export default RecordSubtitleDownloadLinks;
