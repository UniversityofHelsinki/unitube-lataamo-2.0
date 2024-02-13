import React from 'react';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import HelpDialog from './HelpDialog';
import Dialog from './Dialog';

it('renders', () => {
  render(
    <HelpDialog label="help-dialog-test">
      <span>hi</span>
    </HelpDialog>
  );

});

it('shows the header', () => {
  render(
    <HelpDialog label="help-dialog-test">
      <span>content</span>
    </HelpDialog>
  );
  const headerLink = screen.getByText('help-dialog-test');
  expect(headerLink).toBeVisible();
});

it('shows the content when pressed', () => {
  render(
    <HelpDialog label="help-dialog-test">
      <span>content</span>
    </HelpDialog>
  );
  const headerLink = screen.getByRole("button");
  const click = createEvent.click(headerLink, { button: 1 });
  fireEvent(headerLink, click);
  const content = screen.getByRole("dialog");
  expect(content).toBeVisible();
});
