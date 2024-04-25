import {fireEvent, render, screen} from "@testing-library/react";
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

        const menuButtons = screen.getAllByRole("button");
        for (const menuButton of menuButtons) {
          fireEvent.click(menuButton);
        }

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        // use the matcher function in the test
    });
});

