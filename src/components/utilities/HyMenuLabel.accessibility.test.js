import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import HyMenuLabel from "./HyMenuLabel.js";
import React from "react";
import { axe } from "jest-axe";
import { ReactComponent as RandomIcon } from '../utilities/icons/alert.svg';

describe('HyMenuLabel', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
            <HyMenuLabel Icon={RandomIcon} caretUp={false}>
              <span>hei</span>
            </HyMenuLabel>
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
