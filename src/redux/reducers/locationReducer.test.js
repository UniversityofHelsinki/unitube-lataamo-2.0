import React from 'react';
import { render } from '@testing-library/react';
import locationReducer from "./locationReducer";

const state = {};
const  action = {
    type: 'SET_LOCATION',
    payload: []
}
it('renders', () => {
    render(<locationReducer state={state} action={action} />);
});
