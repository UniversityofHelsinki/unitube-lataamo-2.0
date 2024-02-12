import {render} from "@testing-library/react";
import Loading from "./Loading";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);
describe('Loading', () => {

    const renderChildren = false;
    const children = {};

    it('should not have any accessibility violations', async () => {

        const { container } = render(<Loading loading={false} children={children} renderChildren={renderChildren} ><p></p></Loading>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
