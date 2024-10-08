import {render} from "@testing-library/react";
import LeftList from "./LeftList";
import React from "react";
import {axe} from "jest-axe";


describe('LeftList', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<LeftList children={[[<span key="1">adsf</span>, 'asdf']]} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
