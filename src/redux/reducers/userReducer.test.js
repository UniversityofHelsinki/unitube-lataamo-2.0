import React from 'react';
import { render } from '@testing-library/react';
import userReducer from "./userReducer";

const state = {};
const  action = {
    type: 'SET_USER',
    payload: []
}
it('renders', () => {
    render(<userReducer state={state} action={action} />);
});
