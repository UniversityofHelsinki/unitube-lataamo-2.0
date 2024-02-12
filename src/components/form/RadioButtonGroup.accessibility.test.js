import {render} from "@testing-library/react";
import RadioButtonGroup from "./RadioButtonGroup";
import {PUBLICITIES} from "../../Constants";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('RadioButtonGroup', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RadioButtonGroup label="Valinta" options={PUBLICITIES} onChange={() => {}} value={''} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
