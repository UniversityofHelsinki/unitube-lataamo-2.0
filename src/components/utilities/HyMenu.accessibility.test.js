import { fireEvent, render, screen } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import HyMenu from "./HyMenu.js";
import React from "react";
import { axe } from "jest-axe";

describe('HyMenu', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
            <HyMenu disabledItems={[]} selectedItems={[0]} onSelect={() => {}} buttonLabel="test">
              <span>test menu item</span>
              <span>test menu item 1</span>
            </HyMenu>
          </MockProvider>
        );

        const button = screen.getByRole("button");
        fireEvent.click(button);

        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
