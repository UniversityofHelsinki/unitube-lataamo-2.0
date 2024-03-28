import React from 'react';
import PropTypes from 'prop-types';
import './Breadcrumb.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const Breadcrumb = ({crumbs}) => {
    const { t } = useTranslation();
    return (
        <Container className="breadcrumb">
            <Row>
                <Col>
                  <nav aria-label={t('breadcrumb_navigation_label')}>
                    <ol>
                      {crumbs.map((crumb, i) => 
                        <React.Fragment key={i}>
                          <li>
                            {i > 0 ? <span aria-hidden className="breadcrumb-divider"></span> : <></>}
                            {crumb}
                          </li>
                        </React.Fragment>
                      )}
                    </ol>
                  </nav>
                </Col>
            </Row>
        </Container>
    );
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.array.isRequired
};

export default Breadcrumb;
