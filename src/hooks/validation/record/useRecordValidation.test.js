import React from 'react';
import { render } from '@testing-library/react';
import useRecordValidation from "./useRecordValidation";

    const fields = [];
it('renders', () => {
    render(<useRecordValidation fields={fields} />);
});
