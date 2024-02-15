import {render} from "@testing-library/react";
import FormDialog from "./FormDialog";
import React from "react";
import {axe} from "jest-axe";


describe('FormDialog', () => {
    const touched = false;
    const show = false;
    const closeable = false;

    it('should not have any accessibility violations', async () => {

        const { container } = render(<FormDialog touched={touched} show={show} closeable={closeable} children={<span></span>} hide={() => {}} reset={() => {}} showComponent={<span></span>} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
