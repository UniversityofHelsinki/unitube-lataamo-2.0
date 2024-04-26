import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import HeaderMenu from "./HeaderMenu.js";
import React from "react";
import { axe } from "jest-axe";

describe('HeaderMenu', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
            <HeaderMenu />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
