import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import Left from "./Left";
import React from "react";
import {axe} from "jest-axe";

describe('Left', () => {

    const reducers = {
        collections: {},
        records: {
            records: []
        },
        location: {
            path: '/records'
        }
    };


    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={reducers}>
            <Left />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
