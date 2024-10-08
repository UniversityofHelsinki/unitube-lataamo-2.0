import {render} from "@testing-library/react";
import Notifications from "./Notifications";
import React from "react";
import {axe} from "jest-axe";


describe('Notifications', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<Notifications />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
