import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import './RecordCardThumbnail.css';

const PlaceholderBox = () =>
    (<div style={{ minWidth: '160px', minHeight: '160px' }} />);

const CoverImage = ({ coverImage }) => {
    return (
        <img alt="coverImage" src={coverImage}
             style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    );
}

const getCoverImage = (coverImage) => {
    if (coverImage) {
        return <CoverImage coverImage={coverImage} />;
    } else {
        return <PlaceholderBox/>;
    }
};

const RecordCardThumbnail = ({record }) => {
  return (
    <Container className="no-margin record-card-thumbnail">
      <Row>
          <Col className="no-padding">
                 {getCoverImage(record?.cover_image)}
          </Col>

      </Row>
    </Container>
  );
};

RecordCardThumbnail.propTypes = {
    record: PropTypes.object
};

export default RecordCardThumbnail;
