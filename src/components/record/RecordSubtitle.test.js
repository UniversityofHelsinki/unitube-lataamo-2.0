import React from 'react';
import { render } from '@testing-library/react';
import RecordSubtitle from "./RecordSubtitle";

it('renders', () => {
    render(
        <RecordSubtitle onChange={() => {}} message={{ content: 'asdfdf', type: 'neutral' }} file={{ deletionDate: new Date().toISOString() }}  />
    );
});
