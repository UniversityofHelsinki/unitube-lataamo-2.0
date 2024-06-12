import {render} from "@testing-library/react";
import React from "react";
import {axe} from "jest-axe";
import ReleaseNotesDialog from "./ReleaseNotesDialog";

describe('ReleaseNotesDialog', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<ReleaseNotesDialog label="help-dialog-test"></ReleaseNotesDialog>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
