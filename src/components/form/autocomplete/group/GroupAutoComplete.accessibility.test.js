import {render} from "@testing-library/react";
import {MockProvider} from "../../../../redux/reducers/MockProvider";
import GroupAutoComplete from "./GroupAutoComplete";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('GroupAutoComplete', () => {
    const reducers = {
        autocompletion: {
            groups: [{
                grpName: 'asdfasdf'
            }]
        }
    };

    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={reducers}>
            <GroupAutoComplete onSelect={() => {}} />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
