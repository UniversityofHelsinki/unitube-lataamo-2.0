import React from 'react';
import { render } from '@testing-library/react';
import ThreeMonthsWarning from './WarningIcon';

describe('ThreeMonthsWarning function', () => {
    it('renders warning if the deletionDate is three months from now or less', () => {
        const dateObj = new Date();
        dateObj.setMonth(dateObj.getMonth() + 2);

        const { container } = render(<ThreeMonthsWarning deletionDate={dateObj.toISOString()} />);

        expect(container.firstChild).not.toBeNull();
    });

    it('does not render warning if deletionDate is more than three months away', () => {
        const dateObj = new Date();
        dateObj.setMonth(dateObj.getMonth() + 4);

        const { container } = render(<ThreeMonthsWarning deletionDate={dateObj.toISOString()} />);

        expect(container.firstChild).toBeNull();
    });
});
