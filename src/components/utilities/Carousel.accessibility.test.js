import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import Carousel from "./Carousel.js";
import React from "react";
import { axe } from "jest-axe";

describe('Carousel', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
            <Carousel />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
