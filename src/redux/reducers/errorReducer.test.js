import React from 'react';
import { render } from '@testing-library/react';
import errorReducer from "./errorReducer";

const state = {};
const  action = {
    type: 'SET_ERROR',
    payload: []
}
it('renders', () => {
    render(<errorReducer state={state} action={action} />);
});
