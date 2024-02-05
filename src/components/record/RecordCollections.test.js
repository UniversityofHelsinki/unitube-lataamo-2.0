import React from 'react';
import RecordCollections from "./RecordCollections";
import {MockProvider} from "../../redux/reducers/MockProvider";

const  message = {
    content: '',
    type: ['light', 'neutral', 'warning']
};

it('renders', () => {
    <MockProvider>
        <RecordCollections message={message} onChange={() => {}} />
    </MockProvider>
});
