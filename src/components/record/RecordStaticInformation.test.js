import React from 'react';
import { render } from '@testing-library/react';
import RecordStaticInformation from './RecordStaticInformation';

  const record =
      { media:
            [ { url: 'https://unitube.it.helsinki.fi/21EC2020-3AEA-4069-A2DD-08002B30309D',
             mimetype: 'video/mp4',
             bitrate: 1923,
             width: 1280,
             height: 720,
             filesize: 33554432,
             duration: 3600,
             codec: 'h264',
             container: 'mp4' } ],
      };

it('renders', () => {
  render(<RecordStaticInformation record={ record } />);
});
