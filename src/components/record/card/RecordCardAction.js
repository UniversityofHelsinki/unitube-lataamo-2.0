import React from 'react';
import PropTypes from 'prop-types';
import './RecordCardAction.css';
import { Button } from 'react-bootstrap';

const RecordCardAction = ({ icon, label, onClick }) => {
  return (
    <Button variant="link" onClick={onClick} className="record-card-action p-0 m-0">
      {icon}
      {label}
    </Button>
  );
};

RecordCardAction.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func
};

export default RecordCardAction;
