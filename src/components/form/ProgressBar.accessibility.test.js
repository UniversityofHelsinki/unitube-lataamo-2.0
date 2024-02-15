import {render} from "@testing-library/react";
import ProgressBar from "./ProgressBar";
import React from "react";
import {axe} from "jest-axe";


describe('ProgressBar', () => {
    it('should not have any accessibility violations', async () => {

        const { container, rerender } = render(
          <ProgressBar now={12} label="asdf-label" alertMessage={<></>} type="error" />
        );
        rerender(
          <ProgressBar now={12} label="asdf-label" alertMessage={<></>} type="error" />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
