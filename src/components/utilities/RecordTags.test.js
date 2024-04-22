import React from 'react';
import { render } from '@testing-library/react';
import RecordTags from "./RecordTags";
import {MockProvider} from "../../redux/reducers/MockProvider";


it('renders', () => {
    render(<MockProvider>
        <RecordTags
            records={[{ identifier: 'sadf', title: 'asdfasf' }, { identifier: 'fdsa', title: 'hei' }]}
            loadingRecords = {true}
        />
    </MockProvider>);
});
