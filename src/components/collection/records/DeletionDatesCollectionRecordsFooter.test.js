import React from 'react';
import { render } from '@testing-library/react';
import { ProgressStatus } from '../../../Constants';
import DeletionDatesCollectionRecordsFooter from "./DeletionDatesCollectionRecordsFooter";

it('renders', () => {
    render(
        <DeletionDatesCollectionRecordsFooter
            progress={{ status: ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.NOT_STARTED, percentage: 0 }}
            hide={() => {}} />
    );
});
