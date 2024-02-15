import {render} from "@testing-library/react";
import Message from "./Message";
import React from "react";
import {axe} from "jest-axe";

describe('Message', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<Message type="neutral">asdf</Message>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
