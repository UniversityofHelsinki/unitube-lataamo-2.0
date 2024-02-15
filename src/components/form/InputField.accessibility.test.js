import {render} from "@testing-library/react";
import InputField from "./InputField";
import React from "react";
import {axe} from "jest-axe";


describe('InputField', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<InputField
            aria-label="asdf"
            message={{ content: 'asdf', type: 'neutral' }}
        />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
