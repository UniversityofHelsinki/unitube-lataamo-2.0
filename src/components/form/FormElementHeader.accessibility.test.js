import {render} from "@testing-library/react";
import FormElementHeader from "./FormElementHeader";
import React from "react";
import {axe} from "jest-axe";

describe('FormElementHeader', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<FormElementHeader>"asdf"</FormElementHeader>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

