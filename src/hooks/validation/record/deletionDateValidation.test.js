import React from 'react';
import { render } from '@testing-library/react';
import validateDeletionDate from "./deletionDateValidation";

    const ISO = '12-10-2020';
    const record = {};
it('renders', () => {
    render(<validateDeletionDate ISO={ISO} record={record} />);
});
