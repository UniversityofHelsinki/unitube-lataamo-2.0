import {render} from "@testing-library/react";
import LeftList from "./LeftList";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('LeftList', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<LeftList children={[<span key="1">adsf</span>]} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
