import React from 'react';
import { render } from '@testing-library/react';
import CheckBox from './CheckBox';

it('renders', () => {
    render(<CheckBox label="Valinta" />);
});
