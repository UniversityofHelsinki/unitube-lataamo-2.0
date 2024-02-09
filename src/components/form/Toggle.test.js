import { render, screen } from '@testing-library/react';
import Toggle from './Toggle';
import React from "react";

const labels = ["Label 1", "Label 2"];
it('renders', () => {
  render(<Toggle labels={labels} children={[<span key={1}></span>]} index={0} />);
});
