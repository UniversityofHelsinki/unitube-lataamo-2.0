import React from 'react';
import { render } from '@testing-library/react';
import validateDeletionDate from "./deletionDateValidation";

    const ISO = '';
    const record = {};
it('renders', () => {
    render(<validateDeletionDate ISO={ISO} record={record} />);
});
