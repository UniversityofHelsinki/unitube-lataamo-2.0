import React from "react";
import {axe} from "jest-axe";
import {render} from "@testing-library/react";
import CollectionName from "./CollectionName";


describe('CollectionName', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<CollectionName name="collection" />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
