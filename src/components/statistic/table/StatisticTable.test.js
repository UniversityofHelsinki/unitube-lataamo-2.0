import {render} from "@testing-library/react";
import React from "react";
import StatisticTable from "./StatisticTable";

it('renders', () => {
    const stats = [{"timestamp":1708681980000,"totalConnections":3}];
    render(<StatisticTable processedStatistics={stats}  />);
});
