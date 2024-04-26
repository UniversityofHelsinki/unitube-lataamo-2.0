import {render} from "@testing-library/react";
import Logo from "./Logo";
import React from "react";
import {axe} from "jest-axe";
import { MockProvider } from "../../redux/reducers/MockProvider";

describe('Logo', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(
          <MockProvider>
            <Logo />
          </MockProvider>
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
