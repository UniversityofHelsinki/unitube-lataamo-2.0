import {render} from "@testing-library/react";
import {MockProvider} from "../../../../redux/reducers/MockProvider";
import UserAutoComplete from "./UserAutoComplete";
import React from "react";

import {axe} from "jest-axe";


describe('UserAutoComplete', () => {

    const reducers = {
        autocompletion: {
            users: [{ userName: 'asdfasdf' }]
        }
    };

    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={reducers}>
            <UserAutoComplete onSelect={() => {}} />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
