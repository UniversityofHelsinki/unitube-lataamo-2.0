import {render} from "@testing-library/react";
import React from "react";
import {axe} from "jest-axe";
import Thumbnail from "./Thumbnail";

describe('Thumbnail', () => {

    const record = {};

    it('should not have any accessibility violations', async () => {

        const { container } = render(<Thumbnail record={record} width="100" length="100" altText='test'></Thumbnail> );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
