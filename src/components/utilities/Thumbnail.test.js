import React from 'react';
import { render } from '@testing-library/react';
import Thumbnail from './Thumbnail';
import { MockProvider } from '../../redux/reducers/MockProvider';

const record = {};
it('renders', () => {
    render(
      <MockProvider>
        <Thumbnail record={record} width={"100"} length={"100"} altText={"test"} ><p></p></Thumbnail>
      </MockProvider>
    );
});
