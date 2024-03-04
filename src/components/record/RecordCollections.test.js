import React from 'react';
import RecordCollections from "./RecordCollections";
import {MockProvider} from "../../redux/reducers/MockProvider";
import { render } from '@testing-library/react';

const  message = {
    content: '',
    type: ['light', 'neutral', 'warning']
};

it('renders', () => {
    render(<MockProvider>
      <RecordCollections collection="asdf-asdf" message={message} onChange={() => {}} />
    </MockProvider>);
});
