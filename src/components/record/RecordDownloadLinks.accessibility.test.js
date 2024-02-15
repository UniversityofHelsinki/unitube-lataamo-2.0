import {render} from "@testing-library/react";
import RecordDownLoadLinks from "./RecordDownloadLinks";
import React from "react";
import {axe} from "jest-axe";


describe('RecordDownLoadLinks', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordDownLoadLinks media={[]} publications={{}} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
