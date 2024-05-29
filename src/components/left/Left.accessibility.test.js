import {fireEvent, render, screen} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import Left from "./Left";
import React from "react";
import {axe} from "jest-axe";

describe('Left', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider>
            <Left />
        </MockProvider>);

        const sortButton = screen.getByText('Järjestä');
        fireEvent.click(sortButton);

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
