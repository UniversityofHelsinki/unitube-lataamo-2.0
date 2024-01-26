import React from 'react';
import { render } from '@testing-library/react';
import autoCompleteReducer from "./autoCompleteReducer";

    const state = {};
    const  action = {
        type: 'SET_USERS',
        payload: []
    }
it('renders', () => {
    render(<autoCompleteReducer state={state} action={action} />);
});
