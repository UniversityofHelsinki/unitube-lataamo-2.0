import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Left.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ButtonRow from './ButtonRow';
import LeftList from './LeftList';
import Navigation from './Navigation';
import Search from './search/Search';
import RecordCard from '../record/card/RecordCard';
import Loading from '../utilities/Loading';

const Left = () => {
  const [records, setRecords] = useState([]);
  const mockRecords = [{
    name: "video.mp4",
    description: "asdfsdfadf",
    tags: ["käsittelyssä"],
  }, {
    name: "toinen-video.mp4",
    description: "asdfsafasfdf",
    tags: ["asdfasdfasdf"]
  }];
  const recordCards = records.map(record => (
    <RecordCard record={record} />
  ));
  if (records.length === 0) {
    setTimeout(() => setRecords(mockRecords), 3000);
  }
  return (
    <Container className="left">
      <Row>
        <Col className="no-padding">
          <Container className="up-left border-bottom pb-4">
            <Row className="pb-2">
              <Col className="no-padding">
                <Navigation />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <ButtonRow />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Search />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <Loading loading={records.length === 0}>
            <LeftList>
              {recordCards}
            </LeftList>
          </Loading>
        </Col>
      </Row>
    </Container>
  );
};

Left.propTypes = {
};

export default Left;
