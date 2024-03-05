import React from 'react';
import { render } from '@testing-library/react';
import CollectionRecordsDeletionDates from "./CollectionRecordsDeletionDates";

it('renders', () => {
    render(<CollectionRecordsDeletionDates deletionDate={new Date().toISOString()}
                                           onChange={() => {}}
                                           disabled={false}
                                           message={{ content: 'asdf', type: 'neutral' }} />);
});
