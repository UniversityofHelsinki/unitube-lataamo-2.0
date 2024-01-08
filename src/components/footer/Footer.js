import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Translate } from 'react-redux-i18n';
import HyLogo from "../utilities/HyLogo";

const Footer = () => {
  return (
    <Container>
      <Row>
        <Col>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 section left-section">
                            <div className="row">
                                <div className="col-md-3">
                                    <HyLogo />
                                </div>
                                <div className="col-md-9">
                                    <p>
                                        <strong><Translate value="hy" /> </strong>
                                    </p>
                                    <p><Translate value="hy_address_part1" /><br/>
                                        <Translate value="hy_address_part2" />
                                    </p>
                                    <p> <Translate value="hy_switchboard" /></p>
                                    <p>{('maintenance_info')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 section middle-section">
                            <div className="content">
                                <div className="col-md-9">
                                    <p>
                                        <strong>
                                            <a href={('hy_contact_info_link')} target="_blank" rel="noreferrer noopener">
                                                <Translate value="hy_contact_info" />
                                                <span className="screen-reader-only">{('open_in_new_tab')}</span>
                                            </a>
                                        </strong>
                                    </p>
                                    <p>
                                        <strong>
                                            <a href={('hy_terms_of_use_link')} target="_blank" rel="noreferrer noopener">
                                                <Translate value="hy_terms_of_use" />
                                                <span className="screen-reader-only">{('open_in_new_tab')}</span>
                                            </a>
                                        </strong>
                                    </p>
                                    <p>
                                        <strong>
                                            <a href={('hy_lataamo_instructions_link')} target="_blank" rel="noreferrer noopener">
                                                <Translate value="hy_lataamo_instructions" />
                                                <span className="screen-reader-only">{('open_in_new_tab')}</span>
                                            </a>
                                        </strong>
                                    </p>
                                    <p>
                                        <strong>
                                            <a href={('hy_unitube_katsomo_link')} target="_blank" rel="noreferrer noopener">
                                                <Translate value="hy_unitube_katsomo" />
                                                <span className="screen-reader-only">{('open_in_new_tab')}</span>
                                            </a>
                                        </strong>
                                    </p>
                                    <p>
                                        <strong>
                                            <a href='/accessibility_statement.html' target="_blank" rel="noreferrer noopener">
                                                <Translate value="hy_accessibility_statement" />
                                                <span className="screen-reader-only">{('open_in_new_tab')}</span>
                                            </a>
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 section right-section">
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
            </footer>
        </Col>
      </Row>
    </Container>
  );
};

Footer.propTypes = {
};

export default Footer;
