import {render} from "@testing-library/react";
import CheckBox from "./CheckBox";
import React from "react";
import {axe} from "jest-axe";


describe('CheckBox', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(
          <div>
            <label htmlFor="checkbox">asdf</label>
            <CheckBox id="checkbox" label="Valinta" />
          </div>
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

