import React from 'react';
import { default as BsBreadCrumb } from 'react-bootstrap/Breadcrumb';
import PropTypes from 'prop-types';
import './Breadcrumb.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";

const Breadcrumb = ({crumbs}) => {
    return (
        <Container className="breadcrumb">
            <Row>
                <Col>
                  <BsBreadCrumb>
                      {crumbs.map(crumb => (
                          <BsBreadCrumb.Item key={crumb} href="#" active>
                            {crumb}
                          </BsBreadCrumb.Item>
                      ))}
                  </BsBreadCrumb>
                </Col>
            </Row>
        </Container>
    );
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.array.isRequired
};

export default Breadcrumb;
