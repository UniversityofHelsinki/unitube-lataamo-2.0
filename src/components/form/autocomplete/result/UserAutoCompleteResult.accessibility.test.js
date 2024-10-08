import {render} from "@testing-library/react";
import UserAutoCompleteResult from "./UserAutoCompleteResult";
import React from "react";
import {axe} from "jest-axe";


describe('UserAutoCompleteResult', () => {
    const user = {};
    const query = '';

    it('should not have any accessibility violations', async () => {

        const { container } = render(<UserAutoCompleteResult user={user} query={query} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
