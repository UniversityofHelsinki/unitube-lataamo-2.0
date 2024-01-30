import React from 'react';
import { render } from '@testing-library/react';
import RecordDescription from './RecordDescription';
import PropTypes from "prop-types";

it('renders', () => {
    render(
      <RecordDescription 
        description="Lorem ipsum" 
        message={{ content: 'test', type: 'light' }}
        onChange={() => {}} 
      />);
});
