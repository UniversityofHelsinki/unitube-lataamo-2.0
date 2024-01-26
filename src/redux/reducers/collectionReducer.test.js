import React from 'react';
import { render } from '@testing-library/react';
import collectionReducer from "./collectionReducer";

const state = {};
const  action = {
    type: 'SET_COLLECTION',
    payload: []
}
it('renders', () => {
    render(<collectionReducer state={state} action={action} />);
});
