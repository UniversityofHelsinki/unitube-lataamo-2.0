import {render} from "@testing-library/react";
import ExternalLink from "./ExternalLink";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('ExternalLink', () => {

    const to = '';
    const label = '';
    const fill = '';
    const height = 0;
    const width = 0;


    it('should not have any accessibility violations', async () => {

        const { container } = render(<ExternalLink to={to} label={label} fill={fill} height={height} width={width} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
