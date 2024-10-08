import {render} from "@testing-library/react";
import GroupAutoCompleteResult from "./GroupAutoCompleteResult";
import React from "react";
import {axe} from "jest-axe";


describe('GroupAutoCompleteResult', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<GroupAutoCompleteResult group={{ grpName: 'grp-hy-test' }} query="grp-" />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
