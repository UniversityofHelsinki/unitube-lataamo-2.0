import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import RecordsBreadCrumb from "./RecordsBreadCrumb";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('RecordsBreadCrumb', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={{ location: { path: '', searchParameters: {}}}}>
            <RecordsBreadCrumb
                record={{
                    identifier: 'asdf',
                    series:
                        { title: 'asdf', identifier: 'asdf' },
                    title: 'asdf'
                }}
            />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

