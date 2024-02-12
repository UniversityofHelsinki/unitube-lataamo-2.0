import {render} from "@testing-library/react";
import NewRecordFooter from "./NewRecordFooter";
import {ProgressStatus} from "../../Constants";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('NewRecordFooter', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<NewRecordFooter
            onClick={() => {}}
            onCancel={() => {}}
            progress={{ status: ProgressStatus.NOT_STARTED, percentage: 0 }}
            isValid={true} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

