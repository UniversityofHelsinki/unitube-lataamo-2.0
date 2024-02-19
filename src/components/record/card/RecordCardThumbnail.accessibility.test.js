import {render} from "@testing-library/react";
import RecordCardThumbnail from "./RecordCardThumbnail";
import React from "react";
import {axe} from "jest-axe";

describe('RecordCardThumbnail', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordCardThumbnail record={{ title: 'asdf' }}/>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
