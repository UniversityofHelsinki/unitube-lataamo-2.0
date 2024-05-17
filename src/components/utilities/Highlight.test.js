import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Highlight from './Highlight';

it('renders', () => {
  render(<Highlight input="" what="" />);
});

describe('Highlight', () => {

  it('Highlights the given query', () => {
    const a = render(<Highlight input="Pekka Pakkanen" what="Pekka" />);
    expect(a.getByText('Pekka')).toBeInTheDocument();
    expect(a.getByText('Pakkanen')).toBeInTheDocument();
    expect(a.queryByText('Pekka Pakkanen')).not.toBeInTheDocument();
  });

  it('Does not highlight anything if empty string is given', () => {
    const a = render(<Highlight input="Pekka Pakkanen" what="" />);
    expect(a.getByText('Pekka Pakkanen')).toBeInTheDocument();
  });

  it('Highlights all occurences', () => {
    const a = render(<Highlight input="Pekka Pakkanen Pekka" what="Pekka" />);
    expect(a.queryAllByText('Pekka')).toHaveLength(2);
  });

});
