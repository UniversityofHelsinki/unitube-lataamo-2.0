import {render} from "@testing-library/react";
import RecordDescription from "./RecordDescription";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('RecordDescription', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordDescription
            description="Lorem ipsum"
            message={{ content: 'test', type: 'light' }}
            onChange={() => {}}
        />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

