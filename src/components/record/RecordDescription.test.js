import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordDescription from './RecordDescription';
import PropTypes from "prop-types";

const DefaultRecordDescription = (override) =>
    <RecordDescription 
      description="Lorem ipsum" 
      message={{ content: 'test', type: 'light' }}
      onChange={() => {}} 
      { ...override }
    />;

describe('Record\'s description', () => {

  it('renders', () => {
    render(<DefaultRecordDescription />);
  });

  it('shows the description on the field if given', () => {
    render(<DefaultRecordDescription description="test-description" />);
    expect(screen.queryByDisplayValue('test-description')).toBeInTheDocument();
  });

});

