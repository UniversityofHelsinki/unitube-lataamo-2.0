import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import ButtonRow from "./ButtonRow";
import React from "react";
import {axe} from "jest-axe";


describe('ButtonRow', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider>
            <ButtonRow />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
