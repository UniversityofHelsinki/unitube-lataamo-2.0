import React from 'react';
import RecordCollections from "./RecordCollections";
import {MockProvider} from "../../redux/reducers/MockProvider";
import { render } from '@testing-library/react';

it('renders', () => {
    render(<MockProvider>
      <RecordCollections 
        collection="asdf-asdf" 
        message={{ content: '', type: 'light' }} 
        onChange={() => {}} 
      />
    </MockProvider>);
});
