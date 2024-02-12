import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import RecordCrumb from "./RecordCrumb";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('RecordCrumb', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={{ location: { path: '', searchParameters: {}}}}>
            <RecordCrumb record={{ id: '123-456-789', title: 'asdf.mp4' }} />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
