import React from 'react';
import {render} from '@testing-library/react';
import StatisticCard from "./StatisticCard";

it('renders', () => {
    const mockStatistic = {
        username: 'mansikka',
        room:17,
        start_timestamp:1682313704000,
        end_before_timestamp:1682313724000,
        maxViewers:"-",
        location:"Bio2 1041",
        length:20000
    };
    render(<StatisticCard statistic={mockStatistic} />);
});
