import {render} from "@testing-library/react";
import RecordEmbedCode from "./RecordEmbedCode";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('RecordEmbedCode', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordEmbedCode
            identifier="aaaa-bbbb-cccc-eeee-ffff-0000"
        />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

