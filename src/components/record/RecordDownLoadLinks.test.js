import React from 'react';
import { render } from '@testing-library/react';
import RecordDownLoadLinks from "./RecordDownloadLinks";

const to = '';
const label = '';

it('renders', () => {
    render(<RecordDownLoadLinks 
      links={[{
        to: '#first',
        label: 'first'
      }, {
        to: '#second',
        label: 'second'
      }, {
        to: '#third',
        label: 'third'
      }]}/>);
});
