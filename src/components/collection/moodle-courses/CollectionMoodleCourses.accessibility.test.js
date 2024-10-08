import {render} from "@testing-library/react";
import CollectionMoodleCourses from "./CollectionMoodleCourses";
import React from "react";
import {axe} from "jest-axe";


describe('CollectionMoodleCourses', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<CollectionMoodleCourses />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
