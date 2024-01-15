import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import BreadcrumbUrl from "./BreadcrumbUrl";
import './BreadCrumb.css';

const BreadCrumb = () => {
    const crumbs = ['Tallenteet', 'Toka', 'Kolmas'];

    return (
        <Container className="breadcrumb">
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
