import {render} from "@testing-library/react";
import CollectionBottomBar from "./CollectionBottomBar";
import React from "react";
import {axe} from "jest-axe";

describe('CollectionPublicity', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<CollectionBottomBar />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
