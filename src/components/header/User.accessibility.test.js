import {fireEvent, render, screen} from "@testing-library/react";
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
        const button = screen.getByRole("button");
        fireEvent.click(button);

        // use the matcher function in the test
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
