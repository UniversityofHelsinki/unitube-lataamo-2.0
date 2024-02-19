import VideoPreview from "./VideoPreview";
import React from "react";

import {axe} from "jest-axe";
import {render} from "@testing-library/react";


describe('VideoPreview', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<VideoPreview record={{ identifier: 'mock-identifier' }} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});


