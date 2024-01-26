import React from 'react';
import { render } from '@testing-library/react';
import useRecords from "./useRecords";

    const load = false;
it('renders', () => {
    render(<useRecords load={load} />);
});
