import {render} from "@testing-library/react";
import BottomBar from "./BottomBar";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);
describe('BottomBar', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<BottomBar notifications={<></>} buttons={<></>}/>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

