import React from 'react';
import {render} from '@testing-library/react';
import {axe} from 'jest-axe';
import StatisticCard from "./StatisticCard";


describe('StatisticCard', () => {
    const mockStatistic = {
        username: 'mansikka',
        room:17,
        start_timestamp:1682313704000,
        end_before_timestamp:1682313724000,
        maxViewers:"-",
        location:"Bio2 1041",
        length:20000
    };

    it('should not have any accessibility violations', async () => {
        const { container } = render(<StatisticCard statistic={mockStatistic} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
