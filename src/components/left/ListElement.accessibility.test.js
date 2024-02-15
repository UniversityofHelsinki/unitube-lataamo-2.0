import {render} from "@testing-library/react";
import ListElement from "./ListElement";
import React from "react";
import {axe} from "jest-axe";

describe('ListElement', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<ListElement>
            <span>sadfasf</span>
        </ListElement>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

