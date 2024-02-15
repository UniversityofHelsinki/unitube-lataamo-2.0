import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import Header from "./Header";
import React from "react";
import {axe} from "jest-axe";


describe('Header', () => {
    const reducers = {
        users: {
            user: {
                displayName: 'baabenom',
                eppn: 'moro'
            }
        }
    }

    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={reducers}>
            <Header />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

