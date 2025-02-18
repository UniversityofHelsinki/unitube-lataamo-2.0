import {render} from "@testing-library/react";
import AlertBanner from "./AlertBanner";
import React from "react";
import {axe} from "jest-axe";


describe('AlertBanner', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<AlertBanner body="warning"></AlertBanner>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
