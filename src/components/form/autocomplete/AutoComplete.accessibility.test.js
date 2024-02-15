import {render} from "@testing-library/react";
import AutoComplete from "./AutoComplete";
import React from "react";
import {axe} from "jest-axe";

describe('AutoComplete', () => {

    const options = [];
    const placeholder = '';

    it('should not have any accessibility violations', async () => {

        const { container } = render(
          <AutoComplete options={options} onFilter={() => {}} placeholder={placeholder} onSelect={() => {}} ariaLabel={'asdf'} />
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
