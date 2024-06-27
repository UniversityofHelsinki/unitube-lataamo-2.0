import React from 'react';
import { render } from '@testing-library/react';
import RecordViews from "./RecordViews";

it('renders', () => {
    render(
        <RecordViews views={'-'} />
    );
});
