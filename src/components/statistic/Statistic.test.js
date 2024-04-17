import React from 'react';
import {render} from '@testing-library/react';
import Statistic from "./Statistic";
import {MockProvider} from "../../redux/reducers/MockProvider";

it('renders', () => {
    render(<MockProvider>
        <Statistic  />
    </MockProvider>);
});
