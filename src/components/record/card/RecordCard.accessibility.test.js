import {render} from "@testing-library/react";
import RecordCard from "./RecordCard";
import React from "react";

import {axe} from "jest-axe";


describe('RecordCard', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordCard
            record={{ identifier: 'asdf', title: 'hello' }}
            onClick={() => {}}
            selected={false} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

