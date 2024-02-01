import React from 'react';
import { render } from '@testing-library/react';
import RecordCardThumbnail from './RecordCardThumbnail';

it('renders', () => {
  render(<RecordCardThumbnail record={{ title: 'asdf' }}/>);
});
