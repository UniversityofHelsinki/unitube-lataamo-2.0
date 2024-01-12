import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import BreadcrumbUrl from "./BreadcrumbUrl";

const BreadCrumb = () => {
    const { t } = useTranslation();

    const crumbs = ['Tallenteet', 'Toka', 'Kolmas'];

    return (
        <Container>
            <Row>
                <Col>
                    <BreadcrumbUrl crumbs={crumbs} />
                </Col>
            </Row>
        </Container>
    );
};

BreadCrumb.propTypes = {
};

export default BreadCrumb;
