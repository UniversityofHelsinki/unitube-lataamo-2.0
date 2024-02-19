import {render} from "@testing-library/react";
import Dialog from "./Dialog";
import React from "react";
import {axe} from "jest-axe";

describe('Dialog', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<Dialog showComponent={<span></span>} show={false} hide={() => {}} children={<span></span>} closeable={true}><></></Dialog>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
