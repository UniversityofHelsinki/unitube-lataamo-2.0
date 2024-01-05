import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ButtonRow = () => {
  return (
    <Container>
      <Row>
        <button className="col btn btn-primary">Uusi tallenne</button>
      </Row>
    </Container>
  );
};

ButtonRow.propTypes = {
};

export default ButtonRow;
