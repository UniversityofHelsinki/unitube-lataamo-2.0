import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import ClipBoardFormElement from "./ClipBoardFormElement";
import CodeBlockBox from "./CodeBlockBox";
import './RecordEmbedCode.css';

const RecordEmbedCode = () => {
    const { t } = useTranslation();

    const code = '<iframe src="https://unitube.it.helsinki.fi/unitube/embed.html?id=45ce69e0-1793-4494-8674-fff6d48f4a2f" scrolling="no" allowfullscreen="true" frameBorder="0" marginHeight="0px" ' +
        'marginWidth="0px" height="360" width="640"></iframe>';

    return (
        <Container>
            <Row>
                <Col>
                    <ClipBoardFormElement label={t('record_embed_code_header')} size={'h5'} />
                </Col>
            </Row>
            <Row>
                <Col className="blocksize">
                    <CodeBlockBox code={code} language={'jsx'} showLineNumbers={'true'} theme={'light'} />
                </Col>
            </Row>
        </Container>
    );
};

RecordEmbedCode.propTypes = {
};

export default RecordEmbedCode;
