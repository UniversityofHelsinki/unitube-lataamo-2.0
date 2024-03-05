import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ThreeMonthsWarning from '../utilities/WarningIcon';  // Make sure to adjust this according to your actual component location

// Add the custom Jest matchers from jest-axe
expect.extend(toHaveNoViolations);

describe('ThreeMonthsWarning', () => {
    it('should have no accessibility violations', async () => {
        let dateObj = new Date();
        dateObj.setMonth(dateObj.getMonth() + 2);

        const { container } = render(<ThreeMonthsWarning deletionDate={dateObj.toISOString()} />);
        const results = await axe(container);

        // Assert that there are no accessibility violations
        expect(results).toHaveNoViolations();
    });
});
