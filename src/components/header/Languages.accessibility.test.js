import {fireEvent, render, screen} from "@testing-library/react";
import Languages from "./Languages";
import React from "react";
import {axe} from "jest-axe";
import { MockProvider } from "../../redux/reducers/MockProvider";


describe('Languages', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(
          <MockProvider>
            <Languages />
          </MockProvider>
        );

        const button = screen.getByRole("button");
        fireEvent.click(button);

        // use the matcher function in the test
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
