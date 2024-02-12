import {render} from "@testing-library/react";
import CollectionMoodleCourse from "./CollectionMoodleCourse";
import React from "react";
import { ReactComponent as CourseIcon } from '../../utilities/icons/avatar.svg';
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('CollectionMoodleCourse', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<CollectionMoodleCourse
            onRemove={() => {}}
            label="123123"
            Icon={CourseIcon}
        />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

