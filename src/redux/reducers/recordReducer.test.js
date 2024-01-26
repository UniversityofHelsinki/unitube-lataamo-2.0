import React from 'react';
import { render } from '@testing-library/react';
import recordReducer from "./recordReducer";

const state = {};
const  action = {
    type: 'SET_RECORD',
    payload: []
}
it('renders', () => {
    render(<recordReducer state={state} action={action} />);
});
