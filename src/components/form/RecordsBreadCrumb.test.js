import React from 'react';
import { render } from '@testing-library/react';
import RecordsBreadCrumb from "./RecordsBreadCrumb";
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
    render(
      <MockProvider mockReducers={{ location: { path: '', searchParameters: {}}}}>
        <RecordsBreadCrumb 
          record={{ 
            identifier: 'asdf', 
            series: 
              { title: 'asdf', identifier: 'asdf' }
          }}
        />
      </MockProvider>
    );
});
