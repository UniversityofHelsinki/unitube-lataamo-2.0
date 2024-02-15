import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import User from "./User";
import React from "react";
import {axe} from "jest-axe";


describe('User', () => {

    const reducers = {
        users: {
            user: {
                displayName: 'Keijo Keke',
                eppn: 'keijoke'
            }
        }
    };

    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={reducers}>
            <User />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
