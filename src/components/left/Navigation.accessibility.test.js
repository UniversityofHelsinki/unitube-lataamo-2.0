import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import Navigation from "./Navigation";
import React from "react";
import {axe} from "jest-axe";


describe('Navigation', () => {
    const reducers = {
        location: {
            path: "/records"
        }
    };

    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={reducers}>
            <Navigation />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});